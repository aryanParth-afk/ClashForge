# Product Requirement Document (PRD)
## Project Name: ClashForge

### 1. Executive Summary
ClashForge is a dual-purpose full-stack web application designed for Clash of Clans players and clan leaders. It provides a data-driven Village Upgrade Scheduler, a robust Army Builder, a Manual Building Tracker, and a Live Clan Performance Dashboard (via the official Supercell REST API). 

### 2. Core Problems Solved
* **The Player Problem:** Tracking and prioritizing hundreds of upgrade levels across structures, heroes, and laboratory troops involves massive mental math. Furthermore, theory-crafting army compositions visually is clunky in-game.
* **The Leader Problem:** Managing clan activity, monitoring donation ratios, and tracking war participation is tedious using the native mobile interface.

### 3. User Personas
* **The Optimizer (Player):** Wants to know exactly how to allocate their resources and track what buildings are left for their exact Town Hall level. They also want to save custom army compositions tailored to their specific hero levels.
* **The Clan Leader (Admin):** Wants a high-level operational view of clan health to streamline promotions, kicks, and war assignments. Focuses on player metrics.

### 4. Functional Requirements (Scope)
* **Authentication-less Entry:** Allow users to instantly view public data by pasting a Clan Tag or Player Tag without forcing a hard registration first.
* **Live API Data Sync:** Real-time data fetching from Supercell endpoints for clan rosters, member stats, and deep Player Analyzer metrics.
* **Professional Building Tracker:** A local-storage powered checklist strictly capped by the player's current Town Hall level, enabling them to track exactly how many Cannons, X-Bows, etc., they have left to max.
* **Army Builder Studio:** A visual playground to draft, name, save, and delete custom army compositions containing troops, spells, heroes, and siege machines, with costs and housing spaces calculated automatically.