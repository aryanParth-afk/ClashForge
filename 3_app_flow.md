# App Flow
## Project Name: ClashForge

### High-Level Architecture Flow
[ Landing Page ] 
       |
       +---> Option A: Search Clan ---> [ Fetch API via Backend ] ---> [ Clan Dashboard ]
       |                                                                          |
       |                                                                          +---> Roster Table with Sort
       |                                                                          +---> Player Analyzer Link
       |
       +---> Option B: Search Player -> [ Fetch API via Backend ] ----> [ Player Analyzer ]
       |                                                                          |
       |                                                                          +---> Heroes & Equipment
       |                                                                          +---> Lab Troops / Spells
       |                                                                          +---> Smart Building Tracker (Local Storage)
       |
       +---> Global Nav: Army Builder -> [ Interactive UI Studio ] ---> [ Saved Armies (Local Storage) ]

### Step-by-Step User Journey
1. **Entrypoint:** User arrives at a clean, modern homepage with clear navigation for Clan Search, Player Search, and Army Builder.
2. **Path A (Clan Lookup):** 
   - User inputs clan tag (e.g., `#2YPQ0PGLY`). 
   - Frontend routes to `/clan` and fetches Supercell API metadata. 
   - Roster is sortable, and clicking a member routes instantly to their Player Analyzer.
3. **Path B (Player Analyzer):** 
   - User inputs player tag. 
   - User views a heavily visual grid of the player's Troops, Spells, and Heroes. 
   - User clicks the **Buildings** tab to manually tick off their upgraded buildings, constrained strictly by their Town Hall maximums.
4. **Path C (Army Builder):**
   - Accessible via the top Nav bar.
   - User drags and drops (or clicks to add) troops, spells, and heroes into a composition.
   - Resource costs and housing spaces are tracked.
   - User types a name and clicks "Save" to push the army into their persistent `localStorage` cache for later viewing.