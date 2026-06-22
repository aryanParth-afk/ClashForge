"""
ClashForge – Clan API Router

GET /api/v1/clan/{tag}

Implements the Supercell proxy-gateway pattern described in the TRD:
  1. Normalise the incoming clan tag.
  2. Check the Supabase `clan_cache` table (TTL = 10 min).
  3. On cache-miss / stale cache, fetch fresh data from the Supercell API.
  4. Upsert the result into `clan_cache` and return it to the caller.
"""

from __future__ import annotations

import os
from datetime import datetime, timezone, timedelta

import requests as http_client
from fastapi import APIRouter, Depends, HTTPException, Query
from supabase import Client

from app.database import get_db

router = APIRouter(prefix="/api/v1", tags=["Clan"])

# Cache time-to-live: 10 minutes (TRD §2 – Rate Limiting & Caching)
CACHE_TTL = timedelta(minutes=10)

# Supercell API base
SUPERCELL_BASE_URL = "https://api.clashofclans.com/v1"


# ──────────────────────────────────────────────────────────────
# Helper utilities
# ──────────────────────────────────────────────────────────────

def _normalise_tag(raw_tag: str) -> str:
    """
    Strip a leading '#' if the caller included one and upper-case
    the tag so lookups are consistent.

    Examples
    --------
    >>> _normalise_tag("#2YPQ0PGLY")
    '2YPQ0PGLY'
    >>> _normalise_tag("2YPQ0PGLY")
    '2YPQ0PGLY'
    """
    return raw_tag.lstrip("#").upper()


def _encode_tag_for_api(tag: str) -> str:
    """Return the URL-safe encoding required by the Supercell API."""
    return f"%23{tag}"


def _is_cache_valid(updated_at_str: str) -> bool:
    """Return True if the cached row is younger than CACHE_TTL."""
    updated_at = datetime.fromisoformat(updated_at_str)
    # Ensure timezone-aware comparison
    if updated_at.tzinfo is None:
        updated_at = updated_at.replace(tzinfo=timezone.utc)
    return datetime.now(timezone.utc) - updated_at < CACHE_TTL


# ──────────────────────────────────────────────────────────────
# Endpoint
# ──────────────────────────────────────────────────────────────

@router.get("/clan/{tag}")
async def get_clan(
    tag: str,
    force_refresh: bool = Query(False, description="Bypass cache and fetch fresh data"),
    db: Client = Depends(get_db),
):
    """
    Fetch clan information by tag.

    The endpoint transparently caches results in Supabase so repeated
    lookups within a 10-minute window never hit the Supercell API.
    Pass ?force_refresh=true to bypass the cache entirely.
    """

    clean_tag = _normalise_tag(tag)

    # ── 1. Check Supabase cache (skipped when force_refresh) ─
    if not force_refresh:
        cache_response = (
            db.table("clan_cache")
            .select("*")
            .eq("clan_tag", f"#{clean_tag}")
            .execute()
        )

        if cache_response.data:
            cached = cache_response.data[0]
            if _is_cache_valid(cached["updated_at"]):
                return {
                    "source": "cache",
                    "data": cached["raw_data"],
                }

    # ── 2. Fetch fresh data from Supercell ───────────────────
    api_token = os.getenv("COC_API_TOKEN", "")
    if not api_token:
        raise HTTPException(
            status_code=500,
            detail="COC_API_TOKEN is not configured on the server.",
        )

    encoded_tag = _encode_tag_for_api(clean_tag)
    url = f"{SUPERCELL_BASE_URL}/clans/{encoded_tag}"

    try:
        resp = http_client.get(
            url,
            headers={
                "Authorization": f"Bearer {api_token}",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
            timeout=30,
        )
    except http_client.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to reach the Supercell API: {exc}",
        )

    if resp.status_code != 200:
        raise HTTPException(
            status_code=resp.status_code,
            detail=resp.json().get("message", "Supercell API error"),
        )

    clan_data: dict = resp.json()

    # ── 3. Upsert into clan_cache ────────────────────────────
    row = {
        "clan_tag": f"#{clean_tag}",
        "name": clan_data.get("name", ""),
        "level": clan_data.get("clanLevel"),
        "points": clan_data.get("clanPoints"),
        "versus_points": clan_data.get("clanVersusPoints"),
        "member_count": clan_data.get("members"),
        "raw_data": clan_data,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }

    db.table("clan_cache").upsert(row, on_conflict="clan_tag").execute()

    return {
        "source": "api",
        "data": clan_data,
    }
