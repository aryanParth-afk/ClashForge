"""
ClashForge – FastAPI application entry point.

Run with:  uvicorn app.main:app --reload
"""

from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware

from app.routers import clan
from app.services.village_parser import parse_village_data

app = FastAPI(
    title="ClashForge API",
    description="Backend proxy & data engine for ClashForge – a Clash of Clans analytics tool.",
    version="0.1.0",
)

# ---------------------------------------------------------------------------
# CORS – allow the Next.js frontend (dev + production) to call this API
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # Accept requests from any frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Register routers
# ---------------------------------------------------------------------------
app.include_router(clan.router)


# ---------------------------------------------------------------------------
# Health-check endpoint
# ---------------------------------------------------------------------------
@app.get("/", tags=["Health"])
async def root():
    """Basic health-check / liveness probe."""
    return {"status": "ok", "project": "ClashForge"}


# ---------------------------------------------------------------------------
# Village parser endpoint
# ---------------------------------------------------------------------------
@app.post("/api/v1/parse-village", tags=["Village"])
async def parse_village(payload: dict = Body(...)):
    """
    Accept an arbitrary village-export JSON payload, run it through
    the Data-ID parser, and return a human-readable summary.
    """
    return parse_village_data(payload)
