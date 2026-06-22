# Product Requirement Document (PRD)
## Project Name: ClashForge

### 1. Executive Summary
ClashForge is a dual-purpose full-stack web application designed for Clash of Clans players and clan leaders. It provides a data-driven Village Upgrade Scheduler (via raw game JSON parsing) and a Live Clan Performance Dashboard (via the official Supercell REST API). 

### 2. Core Problems Solved
* **The Player Problem:** Tracking and prioritizing hundreds of upgrade levels across structures, heroes, and laboratory troops involves massive mental math and spreadsheet management.
* **The Leader Problem:** Managing clan activity, monitoring donation ratios, and tracking war participation is tedious using the native mobile interface.

### 3. User Personas
* **The Optimizer (Player):** Wants to know exactly how to allocate their 5–6 builders to reach the next Town Hall level with zero idle time. Focuses on resource efficiency.
* **The Clan Leader (Admin):** Wants a high-level operational view of clan health to streamline promotions, kicks, and war assignments. Focuses on player metrics.

### 4. Functional Requirements (Scope)
* **Authentication-less Entry:** Allow users to instantly view public data by pasting a Clan Tag or Village JSON without forcing a hard registration first.
* **JSON Village Parsing:** A text-area input that accepts the raw exported game state (identifying `dataId` and `lvl` fields) and instantly populates a personal metrics dashboard.
* **Live API Data Sync:** Real-time data fetching from Supercell endpoints for clan rosters and war logs.
* **The Upgrade Pipeline:** A visual timeline displaying an optimized order of upgrades based on current resource costs and builder availability.