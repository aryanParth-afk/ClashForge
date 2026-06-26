# Implementation Plan
## Project Name: ClashForge

*(Updated for Go-Live Readiness)*

### Phase 1: Environment Setup & Core Proxy
* Initialize the FastAPI backend project structure and Next.js frontend.
* Set up the `.env.local` file for Supercell API tokens.
* Write the proxy endpoints in Next.js (`/api/clan`, `/api/player`) to bypass CORS and securely fetch data from Supercell servers without exposing the API key to the client.

### Phase 2: Live Clan Dashboard
* Implement the `/clan` route.
* Create a robust, sortable data table for the clan roster, allowing users to sort by Role, Level, Trophies, Donations, and Received.
* Build the dynamic stats grid showing Clan Capital Points, Win Streaks, and War Logs.

### Phase 3: Player Analyzer & Image Proxies
* Build the `/player` route accessible via clicking any member on the Clan roster.
* **Fandom Proxy**: Write a specialized image-proxy route (`/api/image-proxy`) to hash building/troop names (MD5) and fetch high-quality assets directly from the Clash of Clans Wiki static CDN, complete with robust level-based fallback URLs.
* Display Troops, Spells, Heroes, and Pets in a visually stunning dark-mode grid layout.

### Phase 4: Army Builder Studio
* Build the `/army-builder` route.
* Create an interactive UI where users can draft compositions using Troops, Spells, and Siege Machines.
* Implement real-time calculation of resource costs (Gold, Elixir, Dark Elixir) and Housing Spaces.
* Connect a local-storage saving system so users can name, save, edit, and delete their armies.

### Phase 5: Smart Building Tracker
* Build the interactive Buildings tab inside the Player Analyzer.
* Construct `clash-data.ts` to map the exact absolute maximum building counts allowed for every single Town Hall level up to TH18.
* Implement UI logic to show fractional progress (e.g., `5 / 7`) and enforce hard-caps on the `+` increment buttons based on the player's Town Hall level.
* Add success states (orange glows and badge color changes) when a building is maxed out.