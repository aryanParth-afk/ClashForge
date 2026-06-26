-- Backend Schema & Data Architecture
-- Project Name: ClashForge

-- NOTE: ClashForge relies heavily on the official Supercell REST API.
-- The backend (FastAPI) primarily acts as a secure proxy and data formatter.
-- Persistent user data (like Saved Armies and Building Tracker progress) is intentionally 
-- stored entirely in the frontend using `localStorage` to provide a blazing-fast, serverless experience.

-- 1. CLANS CACHE (If Supabase is integrated for rate-limiting)
CREATE TABLE clans (
    tag VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    level INT,
    points INT,
    members_count INT,
    last_synced TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raw_json JSONB -- Stores the exact Supercell API response for instant retrieval
);

-- 2. CLIENT-SIDE DATA STRUCTURES (Stored in browser localStorage)

/*
Army Builder Compositions
Key: clashforge_armies
Structure: Array of Army Objects
[
  {
    "id": "uuid-1234",
    "name": "Queen Charge LaLo",
    "composition": {
      "troops": { "Balloon": 15, "Lava Hound": 2 },
      "spells": { "Rage Spell": 3 },
      "heroes": { "Archer Queen": 1 }
    }
  }
]
*/

/*
Building Tracker Progress
Key: clashforge_buildings_{playerTag}
Structure: Object mapping Building Name to Current Maxed Count
{
  "Cannon": 7,
  "Archer Tower": 5,
  "Monolith": 1,
  "Eagle Artillery": 1
}
*/