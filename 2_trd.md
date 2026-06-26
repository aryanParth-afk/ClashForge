# Technical Requirement Document (TRD)
## Project Name: ClashForge

### 1. System Architecture & Tech Stack
* **Full-Stack Framework:** Next.js 14 (App Router) using TypeScript. Styled with Tailwind CSS and enhanced with `lucide-react` icons.
* **Architecture Shift:** The architecture has been consolidated into a single monolithic Next.js repository. The previous Python/FastAPI backend has been completely replaced by Next.js API Routes (`/api/clan`, `/api/player`, `/api/image-proxy`), which securely act as the backend.
* **State Persistence:** Supabase was removed in favor of a blazing-fast, serverless `localStorage` architecture to save Army Compositions and Building Tracker progress directly to the user's browser, linked by Player Tag.

### 2. API Integration & Security
* **Supercell API Authorization:** Next.js Server API routes securely handle JWT tokens using environment variables (`CLASH_API_KEY`). The frontend client NEVER holds API keys.
* **IP Whitelisting:** Since the Supercell Developer portal binds tokens to specific IP addresses, the Next.js backend proxy ensures requests always originate from the server's approved static IP.
* **Image Proxy CDN:** A specialized `/api/image-proxy` route fetches assets from the Clash of Clans Fandom Wiki, utilizing MD5 hashing and robust level-based fallbacks to bypass Cloudflare and render 3rd party assets cleanly.

### 3. Data Processing Logic
* The Next.js `/lib/clash-data.ts` module acts as the core brain, translating raw API responses into UI-friendly formats, mapping town-hall maximum building counts, and organizing the complex Army Builder logic.