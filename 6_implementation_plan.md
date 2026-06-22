# Implementation Plan
## Project Name: ClashForge

### Phase 1: Environment Setup & Core Parser
* Initialize the FastAPI backend project structure.
* Set up the `.env` file for Supercell API tokens and Supabase connection strings.
* Write the `village_parser.py` service. Create the static mapping for basic CoC `dataId` values (e.g., 1000008 = Cannon) and write a Pydantic model to ingest the raw JSON export.

### Phase 2: API Gateway & Database Caching
* Connect FastAPI to Supabase PostgreSQL using connection pooling.
* Implement the `/api/v1/clan/{tag}` endpoint.
* Write the caching middleware: Check Supabase for the clan tag. If `updated_at` is older than 10 minutes, fetch fresh data from Supercell, update Supabase, and return the data.

### Phase 3: The Optimization Algorithm
* Write the `upgrade_scheduler.py` logic.
* Compare the user's parsed building levels against the maximum possible levels for their current Town Hall.
* Output a structured JSON array representing the "Next Best Upgrades" ordered by builder efficiency.

### Phase 4: Frontend UI Assembly (Next.js)
* Initialize Next.js 14 with Tailwind CSS and shadcn/ui.
* Configure the FinTech dark mode theme (`tailwind.config.ts`).
* Build `/village` route: Create the code-editor text area for JSON pasting and the Gantt-style timeline.
* Build `/clan` route: Create the search bar and the clan data tables showing donation ratios.