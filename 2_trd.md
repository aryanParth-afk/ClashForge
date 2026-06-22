# Technical Requirement Document (TRD)
## Project Name: ClashForge

### 1. System Architecture & Tech Stack
* **Frontend:** Next.js 14 (App Router) using TypeScript. Styled with Tailwind CSS and enhanced with Radix UI primitives (via shadcn/ui) for custom accessible components.
* **Backend:** FastAPI (Python) to handle heavy data manipulation, mapping game data IDs, and scheduling algorithms efficiently with built-in Pydantic validation.
* **Database:** Supabase (PostgreSQL) for storing cached clan states and user-saved upgrade plans.
* **Data Visualization:** Recharts for smooth, interactive data rendering on the frontend.

### 2. API Integration & Security
* **Supercell API Authorization:** The backend must handle JWT tokens securely using environment variables (`COC_API_TOKEN`). The frontend will NEVER hold API keys.
* **IP Whitelisting Architecture:** Since the Supercell Developer portal binds tokens to specific IP addresses, the backend will act as a proxy gateway to ensure requests always originate from an approved static IP.
* **Rate Limiting & Caching:** Implement database caching for clan endpoint requests. The backend must check the `updated_at` timestamp in the database and only fetch fresh data from Supercell if the cache is older than 10 minutes (`TTL: 600s`).

### 3. JSON Parsing Logic
* The backend must translate Supercell internal Data IDs (e.g., `1000008` -> Cannon, `1000001` -> Town Hall) into human-readable objects using a static mapping dictionary.