-- ============================================================
-- ClashForge – Supabase PostgreSQL Schema
-- Run this in the Supabase SQL Editor to bootstrap the database.
-- ============================================================

-- Enable UUID generation (usually pre-enabled on Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------
-- 1. clan_cache
--    Caches full clan JSON responses from the Supercell API.
--    The backend checks `updated_at` against a 10-min TTL
--    before deciding to re-fetch from the external API.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS clan_cache (
    clan_tag        VARCHAR(20)  PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    level           INT,
    points          INT,
    versus_points   INT,
    member_count    INT,
    raw_data        JSONB        NOT NULL,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fast lookup for cache-invalidation queries
CREATE INDEX IF NOT EXISTS idx_clan_cache_updated_at
    ON clan_cache (updated_at);

-- ---------------------------------------------------------
-- 2. user_profiles
--    Stores per-player village snapshots so the frontend can
--    render upgrade planners without re-hitting the API.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_profiles (
    id              UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_tag      VARCHAR(20)  UNIQUE,
    player_name     VARCHAR(100),
    town_hall_level INT          NOT NULL,
    raw_village_json JSONB       NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
