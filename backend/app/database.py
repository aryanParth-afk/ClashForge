"""
ClashForge – Supabase client singleton.

Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env once at module
import time and exposes a single `supabase` client instance that every
module can import without re-initialising the connection.
"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load .env from the project root (backend/.env)
# On Render, env vars are set in the dashboard — load_dotenv is a no-op there
load_dotenv()

SUPABASE_URL: str = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise EnvironmentError(
        "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment. "
        "Set them in Render's Environment tab or in your local .env file."
    )

# Reusable singleton – imported as `from app.database import supabase`
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def get_db() -> Client:
    """FastAPI dependency – returns the shared Supabase client."""
    return supabase
