# UI/UX Brief
## Project Name: ClashForge

### 1. Design Language
- **Theme:** Dark mode by default to match the intense, war-focused nature of Clash of Clans.
- **Palette:** 
  - Background: Deep Slate `#0B1120`
  - Primary Accent: Clash Gold `#facc15`
  - Secondary Accent: Elixir Pink `#ec4899` and Dark Elixir Purple `#8b5cf6`
  - Success/Shield: Emerald Green `#10b981`
- **Typography:** Inter for clean numbers/data, paired with a display font (like 'Cinzel' or 'Oswald') for headers to mimic the game's medieval typography.

### 2. Core Screens
*   **Landing Dashboard:**
    *   Hero section with high-quality Clash graphics.
    *   Prominent dual search bars: "Enter Clan Tag" and "Enter Player Tag".
*   **Clan Dashboard (`/clan`):**
    *   Clean, sortable table for the clan roster (sort by Role, Level, Trophies, Donations).
    *   Hovering over a player name turns it teal and links to the Player Analyzer.
    *   Stat cards displaying key metrics like Capital Points and Win Streak.
*   **Player Analyzer (`/player`):**
    *   Hero section displaying Player Name, Tag, TH Level, and League Badge.
    *   Categorized grid views for Troops, Spells, and Heroes using dynamic Fandom Wiki image proxies.
    *   **Smart Building Tracker:** An interactive checklist with fractional max caps (e.g., `5 / 7`) that highlights orange when a building type is maxed.
*   **Army Builder (`/army-builder`):**
    *   A massive interactive studio where users click on troops/spells to add them to a live composition.
    *   Resource cost calculation banner.
    *   "Saved Armies" sidebar mapped via local storage.

### 3. Key Interactions & Micro-animations
- **Interactive Counters:** Building tracker uses smooth hover states and disabled buttons for hard caps.
- **Image Fallbacks:** Broken Fandom images seamlessly degrade to sleek SVG icons.
- **Glassmorphism:** Cards use subtle semi-transparent backgrounds with thin borders (`bg-black/40 backdrop-blur-md`).