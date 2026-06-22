# App Flow
## Project Name: ClashForge

### High-Level Architecture Flow
[ Landing Page ] 
       |
       +---> Option A: Enter Clan Tag ---> [ Fetch API via Backend ] ---> [ Clan Dashboard ]
       |                                                                          |
       |                                                                          +---> Members Table
       |                                                                          +---> War Analytics
       |
       +---> Option B: Paste Village JSON -> [ Python Parse Engine ] ----> [ Upgrade Planner ]
                                                                                  |
                                                                                  +---> Resource Calc
                                                                                  +---> Builder Timeline

### Step-by-Step User Journey
1. **Entrypoint:** User arrives at a clean, modern homepage with two clear paths: "Analyze Clan" or "Optimize Village".
2. **Path A (Clan Lookup):** 
   - User inputs clan tag (e.g., `#2PPG28RQP`). 
   - Frontend sends a request to `/api/v1/clan/{tag}`. 
   - Backend validates the tag, checks the Supabase cache, hits the Supercell API if needed, formats the JSON response, and serves the dashboard.
3. **Path B (Village Parsing):** 
   - User copies their village layout JSON string from the in-game export tool and pastes it into an optimized code-editor-style field. 
   - Frontend instantly validates the JSON formatting before sending it to the FastAPI backend.
   - Backend decodes the `dataId` fields, matches them against max level requirements, and returns a prioritized array of upgrades.