-- ClashForge PostgreSQL Schema (Supabase Optimized)

-- Enable UUID extension (Supabase usually has this on by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core table to cache clan details and minimize external API calls
CREATE TABLE clan_cache (
    clan_tag VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INT,
    points INT,
    versus_points INT,
    member_count INT,
    raw_data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store village upgrade profiles
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_tag VARCHAR(20) UNIQUE,
    player_name VARCHAR(100),
    town_hall_level INT NOT NULL,
    raw_village_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster cache invalidation queries
CREATE INDEX idx_clan_cache_updated_at ON clan_cache(updated_at);