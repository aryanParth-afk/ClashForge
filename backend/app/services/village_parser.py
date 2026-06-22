"""
ClashForge – Village JSON Parser

Translates raw Clash of Clans village export data into a structured,
human-readable summary.  The Supercell API returns buildings as opaque
integer Data IDs; this module decodes them via a static lookup dictionary
and computes useful aggregates (building roster, busy builders, etc.).
"""

from __future__ import annotations

from typing import Optional
from pydantic import BaseModel, Field


# ──────────────────────────────────────────────────────────────
# 1. Pydantic Models
# ──────────────────────────────────────────────────────────────

class BuildingEntry(BaseModel):
    """One element from the village JSON `buildings` array."""
    dataId: int = Field(..., description="Supercell internal Data ID")
    lvl: int = Field(0, description="Current upgrade level")
    timer: Optional[int] = Field(
        0,
        description="Remaining upgrade time in seconds. "
                    "A value > 0 means a builder is busy on this building.",
    )


class VillageLayout(BaseModel):
    """
    Top-level schema for a Clash of Clans village export.

    Expects at minimum a `buildings` key containing a list of
    BuildingEntry objects.  Extra keys in the JSON are silently
    ignored so the model stays forward-compatible with future
    Supercell schema additions.
    """
    buildings: list[BuildingEntry] = Field(
        ..., description="Array of building objects in the village"
    )

    class Config:
        # Allow extra keys from the raw Supercell payload without erroring
        extra = "ignore"


# ──────────────────────────────────────────────────────────────
# 2. Data-ID → Human-Readable Name Mapping
# ──────────────────────────────────────────────────────────────

DATA_ID_MAP: dict[int, str] = {
    # ── Resource & Core ──
    1000001: "Town Hall",
    1000000: "Elixir Collector",
    1000002: "Elixir Storage",
    1000003: "Gold Mine",
    1000004: "Gold Storage",
    1000014: "Army Camp",
    1000015: "Barracks",

    # ── Defenses ──
    1000005: "Wall",
    1000006: "Bomb",
    1000008: "Cannon",
    1000009: "Archer Tower",
    1000010: "Mortar",
    1000011: "Air Defense",
    1000012: "Wizard Tower",
    1000019: "Hidden Tesla",
    1000020: "X-Bow",
    1000021: "Inferno Tower",
    1000022: "Eagle Artillery",

    # ── Traps ──
    1000016: "Spring Trap",
    1000017: "Air Bomb",
    1000018: "Giant Bomb",

    # ── Heroes ──
    1000026: "Barbarian King Altar",
    1000027: "Archer Queen Altar",
    1000028: "Grand Warden Altar",
}


# ──────────────────────────────────────────────────────────────
# 3. Core Parsing Function
# ──────────────────────────────────────────────────────────────

def _resolve_name(data_id: int) -> str:
    """Return a human-readable name for a Data ID, falling back gracefully."""
    return DATA_ID_MAP.get(data_id, f"Unknown ({data_id})")


def parse_village_data(raw_json: dict) -> dict:
    """
    Parse a raw village export and return a structured summary.

    Parameters
    ----------
    raw_json : dict
        The full JSON payload from a village export.  Must contain a
        ``buildings`` key with a list of objects carrying ``dataId``,
        ``lvl``, and an optional ``timer`` field.

    Returns
    -------
    dict
        {
            "total_buildings": int,
            "busy_builders":   int,   # buildings where timer > 0
            "buildings": [
                {
                    "data_id":  int,
                    "name":     str,
                    "level":    int,
                    "upgrading": bool,
                },
                ...
            ]
        }

    Raises
    ------
    pydantic.ValidationError
        If the incoming JSON does not match the expected schema.
    """

    # Validate & parse through Pydantic (raises on bad data)
    layout = VillageLayout(**raw_json)

    buildings_summary: list[dict] = []
    busy_builders: int = 0

    for entry in layout.buildings:
        is_upgrading = (entry.timer or 0) > 0

        if is_upgrading:
            busy_builders += 1

        buildings_summary.append(
            {
                "data_id": entry.dataId,
                "name": _resolve_name(entry.dataId),
                "level": entry.lvl,
                "upgrading": is_upgrading,
            }
        )

    return {
        "total_buildings": len(buildings_summary),
        "busy_builders": busy_builders,
        "buildings": buildings_summary,
    }
