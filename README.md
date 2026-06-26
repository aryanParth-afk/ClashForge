# ClashForge

<div align="center">
  <p><strong>ClashForge is a professional, full-stack Next.js and FastAPI application designed for Clash of Clans players and clan leaders.</strong></p>
  
  [![View Live Demo](https://img.shields.io/badge/🔴_View_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://clash-forge-byu6.vercel.app/)
</div>

<br />

It provides a **Live Clan Dashboard**, an advanced **Player Analyzer**, a **Smart Building Tracker**, and a highly interactive **Army Builder Studio**.

## 🚀 Key Features

* **Clan Dashboard**: Real-time clan roster syncing via the Supercell API with dynamic sorting and deep-linking to player profiles. Cached heavily via Supabase to bypass rate limits.
* **Player Analyzer**: Visual grid of Troops, Spells, Heroes, and Pets using an advanced Fandom Wiki image proxy.
* **Smart Building Tracker**: A local-storage powered checklist strictly capped by the player's current Town Hall level, enabling you to track exactly how many defenses you have left to max.
* **Army Builder Studio**: A visual playground to draft, name, save, and delete custom army compositions, with resource costs and housing spaces calculated automatically.

## 🛠 Tech Stack (Split Architecture)

* **Frontend Framework**: Next.js 14 (App Router) with Tailwind CSS & Lucide Icons.
* **Backend Framework**: FastAPI (Python) handles the Clan Dashboard caching and data normalization.
* **Database**: Supabase (PostgreSQL) is used by the backend to cache clan states and reduce Supercell API hits.
* **State Management**: React Hooks & LocalStorage (for blazing-fast, serverless Army Builder persistence).
* **Third-Party APIs**: Official Clash of Clans Developer API.

---

## 📦 Local Development

### 1. Backend Setup (FastAPI + Supabase)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Create a `backend/.env` file:
```env
COC_API_TOKEN=your_supercell_jwt
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```
Run the backend:
```bash
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
```
Create a `frontend/.env.local` file:
```env
# Point this to your local Python backend
NEXT_PUBLIC_API_URL=http://localhost:8000
# The frontend Player Analyzer also fetches directly via Next.js proxy
CLASH_API_KEY=your_supercell_jwt 
```
Run the frontend:
```bash
npm run dev
```

---

## 🌍 Deployment Architecture

ClashForge utilizes a split-stack deployment strategy.

1. **Backend (Render / Railway)**: The `backend/` Python folder is deployed as a Web Service. It connects to the Supabase PostgreSQL database to cache Clan API responses.
2. **Frontend (Vercel)**: The `frontend/` folder is deployed on Vercel. 
   - **Important**: In Vercel, you must set the `NEXT_PUBLIC_API_URL` environment variable to the live URL of your Python backend (e.g., `https://clashforge-backend.onrender.com`).
   - You must also set the `CLASH_API_KEY` in Vercel for the Player Analyzer API routes to function.
