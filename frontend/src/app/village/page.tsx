"use client";

import { useState } from "react";
import {
  Castle,
  Loader2,
  Hammer,
  CheckCircle2,
  AlertTriangle,
  Clipboard,
  Sparkles,
  Shield,
  FlaskConical,
  Sword,
  Crown,
} from "lucide-react";

/* ── Types ── */
interface ParsedItem {
  data_id: number;
  name: string;
  level: number;
  count: number;
  category: "building" | "troop" | "hero" | "spell" | "unknown";
  upgrading: boolean;
}

interface ParsedResult {
  town_hall_level: number | null;
  buildings: ParsedItem[];
  troops: ParsedItem[];
  heroes: ParsedItem[];
  spells: ParsedItem[];
  total_buildings: number;
  busy_builders: number;
}

/* ──────────────────────────────────────────────────────────────
   Data-ID → Human-Readable Name Mappings
   CoC exports use different ID ranges per category:
     1000xxxx  = Home-village buildings (old format)
     12000xxx  = Home-village buildings (layout export)
     4000xxxx  = Troops / units
     28000xxx  = Heroes
     26000xxx  = Spells
     8000xxxx  = Obstacles
   ────────────────────────────────────────────────────────────── */

const BUILDING_ID_MAP: Record<number, string> = {
  // ── Old-style IDs (1000xxxx) ──
  1000001: "Town Hall",
  1000000: "Elixir Collector",
  1000002: "Elixir Storage",
  1000003: "Gold Mine",
  1000004: "Gold Storage",
  1000005: "Wall",
  1000006: "Bomb",
  1000007: "Builder's Hut",
  1000008: "Cannon",
  1000009: "Archer Tower",
  1000010: "Mortar",
  1000011: "Air Defense",
  1000012: "Wizard Tower",
  1000013: "Laboratory",
  1000014: "Army Camp",
  1000015: "Barracks",
  1000016: "Spring Trap",
  1000017: "Air Bomb",
  1000018: "Giant Bomb",
  1000019: "Hidden Tesla",
  1000020: "X-Bow",
  1000021: "Inferno Tower",
  1000022: "Eagle Artillery",
  1000023: "Spell Factory",
  1000024: "Dark Spell Factory",
  1000025: "Dark Barracks",
  1000026: "Barbarian King Altar",
  1000027: "Archer Queen Altar",
  1000028: "Grand Warden Altar",
  1000029: "Workshop",
  1000030: "Pet House",
  1000031: "Scattershot",
  1000034: "Clan Castle",
  1000035: "Seeking Air Mine",
  1000036: "Tornado Trap",
  1000037: "Royal Champion Altar",

  // ── Layout-export IDs (12000xxx) ──
  12000000: "Town Hall",
  12000001: "Elixir Collector",
  12000002: "Elixir Storage",
  12000003: "Gold Mine",
  12000004: "Gold Storage",
  12000005: "Wall",
  12000006: "Cannon",
  12000007: "Archer Tower",
  12000008: "Mortar",
  12000009: "Air Defense",
  12000010: "Wizard Tower",
  12000011: "Hidden Tesla",
  12000012: "X-Bow",
  12000013: "Inferno Tower",
  12000014: "Army Camp",
  12000015: "Barracks",
  12000016: "Laboratory",
  12000017: "Spell Factory",
  12000018: "Builder's Hut",
  12000019: "Clan Castle",
  12000020: "Dark Elixir Drill",
  12000021: "Dark Elixir Storage",
  12000022: "Dark Barracks",
  12000023: "Dark Spell Factory",
  12000024: "Eagle Artillery",
  12000025: "Bomb",
  12000026: "Spring Trap",
  12000027: "Air Bomb",
  12000028: "Giant Bomb",
  12000029: "Seeking Air Mine",
  12000030: "Tornado Trap",
  12000031: "Scattershot",
  12000032: "Workshop",
  12000033: "Pet House",
  12000034: "Skeleton Trap",
  12000035: "Monolith",
  12000036: "Spell Tower",
  12000037: "Multi-Archer Tower",
  12000038: "Ricochet Cannon",
  12000039: "Firespitter",
  12000040: "Builder's Hut (Gear)",
};

const TROOP_ID_MAP: Record<number, string> = {
  4000000: "Barbarian",
  4000001: "Archer",
  4000002: "Goblin",
  4000003: "Giant",
  4000004: "Wall Breaker",
  4000005: "Balloon",
  4000006: "Wizard",
  4000007: "Healer",
  4000008: "Dragon",
  4000009: "P.E.K.K.A",
  4000010: "Baby Dragon",
  4000011: "Miner",
  4000012: "Electro Dragon",
  4000013: "Yeti",
  4000014: "Dragon Rider",
  4000015: "Electro Titan",
  4000016: "Root Rider",
  4000017: "Hog Rider",
  4000018: "Valkyrie",
  4000019: "Golem",
  4000020: "Witch",
  4000021: "Lava Hound",
  4000022: "Bowler",
  4000023: "Ice Golem",
  4000024: "Headhunter",
  4000025: "Super Barbarian",
  4000026: "Super Archer",
  4000027: "Super Giant",
  4000028: "Sneaky Goblin",
  4000029: "Super Wall Breaker",
  4000030: "Rocket Balloon",
  4000031: "Super Wizard",
  4000032: "Super Dragon",
  4000033: "Inferno Dragon",
  4000034: "Super Miner",
  4000035: "Super Minion",
  4000036: "Super Hog Rider",
  4000037: "Super Valkyrie",
  4000038: "Super Witch",
  4000039: "Ice Hound",
  4000040: "Super Bowler",
  4000041: "Super Lava Hound",
  4000042: "Apprentice Warden",
  4000049: "Minion",
  4000056: "Thrower",
  4000057: "Druid",
  4000058: "Furnace",
  4000059: "Pheonix",
  4000070: "Overgrowth Spell",
  4000091: "Spirit Fox",
  4000092: "Angry Jelly",
  4000097: "Frosty",
  4000098: "Diggy",
  4000099: "Poison Lizard",
  4000100: "Phoenix",
  4000101: "L.A.S.S.I",
  4000105: "Unicorn",
  4000106: "Mighty Yak",
  4000107: "Electro Owl",
};

const HERO_ID_MAP: Record<number, string> = {
  28000000: "Barbarian King",
  28000001: "Archer Queen",
  28000002: "Grand Warden",
  28000003: "Royal Champion",
  28000004: "Minion Prince",
  28000005: "Battle Machine",
};

const SPELL_ID_MAP: Record<number, string> = {
  26000000: "Lightning Spell",
  26000001: "Healing Spell",
  26000002: "Rage Spell",
  26000003: "Jump Spell",
  26000004: "Freeze Spell",
  26000005: "Poison Spell",
  26000006: "Earthquake Spell",
  26000007: "Haste Spell",
  26000008: "Clone Spell",
  26000009: "Skeleton Spell",
  26000010: "Bat Spell",
  26000011: "Invisibility Spell",
  26000012: "Recall Spell",
  26000013: "Overgrowth Spell",
};

function resolveItem(dataId: number): { name: string; category: ParsedItem["category"] } {
  if (BUILDING_ID_MAP[dataId]) return { name: BUILDING_ID_MAP[dataId], category: "building" };
  if (TROOP_ID_MAP[dataId]) return { name: TROOP_ID_MAP[dataId], category: "troop" };
  if (HERO_ID_MAP[dataId]) return { name: HERO_ID_MAP[dataId], category: "hero" };
  if (SPELL_ID_MAP[dataId]) return { name: SPELL_ID_MAP[dataId], category: "spell" };

  // Guess category by ID range
  if (dataId >= 12000000 && dataId < 13000000) return { name: `Building (${dataId})`, category: "building" };
  if (dataId >= 1000000 && dataId < 2000000) return { name: `Building (${dataId})`, category: "building" };
  if (dataId >= 4000000 && dataId < 5000000) return { name: `Troop (${dataId})`, category: "troop" };
  if (dataId >= 28000000 && dataId < 29000000) return { name: `Hero (${dataId})`, category: "hero" };
  if (dataId >= 26000000 && dataId < 27000000) return { name: `Spell (${dataId})`, category: "spell" };
  return { name: `Unknown (${dataId})`, category: "unknown" };
}

/* ── Flexible JSON Parser ──
   Handles multiple CoC export formats:
   1. Real export: { buildings, units2, heroes2, ... } with "data"/"lvl"/"cnt" keys
   2. API-style: { "buildings": [{ "dataId": ..., "lvl": ... }] }
   3. Raw arrays: [{ "data": ..., "lvl": ... }]
*/
interface RawEntry {
  dataId: number;
  lvl: number;
  count: number;
  timer: number;
  category: ParsedItem["category"];
}

function extractEntries(data: unknown, hintCategory?: ParsedItem["category"]): RawEntry[] {
  if (Array.isArray(data)) {
    const entries = data
      .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
      .filter((item) => {
        // Accept objects with "data" OR "dataId"/"data_id"/"id"
        const hasId = "data" in item || "dataId" in item || "data_id" in item || "id" in item;
        const hasLevel = "lvl" in item || "level" in item || "lv" in item;
        return hasId && hasLevel;
      })
      .map((item) => {
        const dataId = Number(item.data ?? item.dataId ?? item.data_id ?? item.id ?? 0);
        const resolved = resolveItem(dataId);
        return {
          dataId,
          lvl: Number(item.lvl ?? item.level ?? item.lv ?? 0),
          count: Number(item.cnt ?? item.count ?? 1),
          timer: Number(item.timer ?? item.remaining ?? item.upgradeTime ?? 0),
          category: hintCategory ?? resolved.category,
        };
      });

    if (entries.length > 0) return entries;
  }

  // If it's an array but items only have "data" and "cnt" (obstacles etc.) — skip
  if (Array.isArray(data)) {
    const obstacleish = data
      .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
      .filter((item) => "data" in item && "cnt" in item && !("lvl" in item));
    if (obstacleish.length > 0) return []; // obstacles — skip
  }

  return [];
}

function parseVillageData(raw: unknown): ParsedResult {
  const allEntries: RawEntry[] = [];

  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid JSON — expected an object or array.");
  }

  const obj = raw as Record<string, unknown>;

  // ── Strategy 1: Real CoC export format ──
  // Look for known section keys
  const sectionMapping: [string[], ParsedItem["category"]][] = [
    [["buildings", "buildings2", "building_data", "buildingData"], "building"],
    [["units", "units2", "troops", "troop_data"], "troop"],
    [["heroes", "heroes2", "hero_data"], "hero"],
    [["spells", "spells2", "spell_data"], "spell"],
  ];

  for (const [keys, category] of sectionMapping) {
    for (const key of keys) {
      if (key in obj && Array.isArray(obj[key])) {
        allEntries.push(...extractEntries(obj[key], category));
      }
    }
  }

  // ── Strategy 2: Top-level array (just an array of items) ──
  if (allEntries.length === 0 && Array.isArray(raw)) {
    allEntries.push(...extractEntries(raw));
  }

  // ── Strategy 3: Recurse into any unknown key ──
  if (allEntries.length === 0) {
    for (const key of Object.keys(obj)) {
      if (["obstacles", "obstacles2", "decos", "decos2", "skins", "skins2", "sceneries", "sceneries2", "boosts", "boosts2"].includes(key)) {
        continue; // skip non-building data
      }
      const entries = extractEntries(obj[key]);
      allEntries.push(...entries);
    }
  }

  if (allEntries.length === 0) {
    throw new Error(
      'Could not find building/troop data in the JSON. The parser looks for objects with ' +
      '"data" (or "dataId") and "lvl" (or "level") fields. Try using the "Paste Sample" button to see a working example.'
    );
  }

  // Separate into categories
  const buildings: ParsedItem[] = [];
  const troops: ParsedItem[] = [];
  const heroes: ParsedItem[] = [];
  const spells: ParsedItem[] = [];
  let townHallLevel: number | null = null;
  let busyBuilders = 0;

  for (const entry of allEntries) {
    const resolved = resolveItem(entry.dataId);
    const item: ParsedItem = {
      data_id: entry.dataId,
      name: resolved.name,
      level: entry.lvl,
      count: entry.count,
      category: entry.category,
      upgrading: entry.timer > 0,
    };

    if (item.upgrading) busyBuilders++;

    // Detect Town Hall
    if (resolved.name === "Town Hall") {
      townHallLevel = entry.lvl;
    }

    switch (entry.category) {
      case "troop":
        troops.push(item);
        break;
      case "hero":
        heroes.push(item);
        break;
      case "spell":
        spells.push(item);
        break;
      default:
        buildings.push(item);
        break;
    }
  }

  // Sort each category by level descending
  const sortByLevel = (a: ParsedItem, b: ParsedItem) => b.level - a.level;
  buildings.sort(sortByLevel);
  troops.sort(sortByLevel);
  heroes.sort(sortByLevel);
  spells.sort(sortByLevel);

  return {
    town_hall_level: townHallLevel,
    buildings,
    troops,
    heroes,
    spells,
    total_buildings: buildings.length,
    busy_builders: busyBuilders,
  };
}

/* ── Sample JSON (real export format) ── */
const SAMPLE_JSON = JSON.stringify(
  {
    buildings: [
      { data: 12000000, lvl: 14, cnt: 1 },
      { data: 12000006, lvl: 18, cnt: 5 },
      { data: 12000007, lvl: 18, cnt: 5 },
      { data: 12000008, lvl: 13, cnt: 4 },
      { data: 12000009, lvl: 12, cnt: 4 },
      { data: 12000010, lvl: 13, cnt: 5 },
      { data: 12000011, lvl: 12, cnt: 4 },
      { data: 12000012, lvl: 7, cnt: 4 },
      { data: 12000013, lvl: 7, cnt: 2 },
      { data: 12000014, lvl: 11, cnt: 5 },
      { data: 12000024, lvl: 5, cnt: 1 },
      { data: 12000031, lvl: 3, cnt: 2 },
    ],
    units2: [
      { data: 4000000, lvl: 10 },
      { data: 4000005, lvl: 9 },
      { data: 4000008, lvl: 8 },
      { data: 4000009, lvl: 9 },
    ],
    heroes2: [
      { data: 28000000, lvl: 75 },
      { data: 28000001, lvl: 75 },
      { data: 28000002, lvl: 50 },
      { data: 28000003, lvl: 30 },
    ],
  },
  null,
  2
);

export default function VillagePage() {
  const [jsonInput, setJsonInput] = useState("");
  const [result, setResult] = useState<ParsedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"buildings" | "troops" | "heroes" | "spells">("buildings");

  function handleSubmit() {
    setError(null);
    setResult(null);

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonInput);
    } catch {
      setError("Invalid JSON — please check your syntax and try again.");
      return;
    }

    setLoading(true);

    try {
      const data = parseVillageData(parsed);
      setResult(data);
      // Auto-select first non-empty tab
      if (data.buildings.length > 0) setActiveTab("buildings");
      else if (data.troops.length > 0) setActiveTab("troops");
      else if (data.heroes.length > 0) setActiveTab("heroes");
      else if (data.spells.length > 0) setActiveTab("spells");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handlePasteSample() {
    setJsonInput(SAMPLE_JSON);
    setResult(null);
    setError(null);
  }

  const tabs = result
    ? [
        { key: "buildings" as const, label: "Buildings", count: result.buildings.length, icon: <Castle className="h-3.5 w-3.5" /> },
        { key: "troops" as const, label: "Troops", count: result.troops.length, icon: <Sword className="h-3.5 w-3.5" /> },
        { key: "heroes" as const, label: "Heroes", count: result.heroes.length, icon: <Crown className="h-3.5 w-3.5" /> },
        { key: "spells" as const, label: "Spells", count: result.spells.length, icon: <FlaskConical className="h-3.5 w-3.5" /> },
      ]
    : [];

  const activeItems = result
    ? result[activeTab]
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/10">
          <Castle className="h-5 w-5 text-chart-1" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Village Analyser</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Paste your village export JSON to decode buildings, troops, heroes &amp; more.
        Parsing happens <strong>instantly</strong> in your browser.
      </p>

      {/* ── Input Card ── */}
      <div className="glass rounded-2xl p-6 mb-6" id="village-input-card">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="village-json" className="text-sm font-medium text-foreground">
            Village JSON
          </label>
          <button
            type="button"
            onClick={handlePasteSample}
            id="btn-paste-sample"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <Clipboard className="h-3.5 w-3.5" />
            Paste Sample
          </button>
        </div>

        <textarea
          id="village-json"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={SAMPLE_JSON}
          rows={10}
          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y transition-shadow"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !jsonInput.trim()}
          id="btn-parse-village"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed glow"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Parsing…" : "Analyse"}
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" id="village-error">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Results ── */}
      {result && (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" id="village-results">
          {/* Summary row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {result.town_hall_level !== null && (
              <SummaryCard label="Town Hall" value={result.town_hall_level} icon={<Castle className="h-4 w-4 text-chart-2" />} />
            )}
            <SummaryCard label="Buildings" value={result.buildings.length} icon={<Shield className="h-4 w-4 text-chart-1" />} />
            <SummaryCard label="Troops" value={result.troops.length} icon={<Sword className="h-4 w-4 text-chart-4" />} />
            <SummaryCard label="Heroes" value={result.heroes.length} icon={<Crown className="h-4 w-4 text-chart-5" />} />
            <SummaryCard label="Busy Builders" value={result.busy_builders} icon={<Hammer className="h-4 w-4 text-chart-3" />} />
          </div>

          {/* Tabbed data table */}
          <div className="glass rounded-2xl overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-border overflow-x-auto">
              {tabs.filter(t => t.count > 0).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                    activeTab === tab.key ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm" id="items-table">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3">#</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3 text-center">Level</th>
                    {activeTab === "buildings" && <th className="px-5 py-3 text-center">Count</th>}
                    {activeTab === "buildings" && <th className="px-5 py-3 text-center">Status</th>}
                    <th className="px-5 py-3 text-right">Data ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {activeItems.map((item, i) => (
                    <tr key={`${item.data_id}-${i}`} className="transition-colors hover:bg-accent/40">
                      <td className="px-5 py-3 text-xs text-muted-foreground">{i + 1}</td>
                      <td className="px-5 py-3 font-medium">{item.name}</td>
                      <td className="px-5 py-3 text-center">
                        <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-lg bg-primary/10 px-2 text-xs font-bold text-primary">
                          {item.level}
                        </span>
                      </td>
                      {activeTab === "buildings" && (
                        <td className="px-5 py-3 text-center">
                          <span className="text-xs font-mono text-muted-foreground">×{item.count}</span>
                        </td>
                      )}
                      {activeTab === "buildings" && (
                        <td className="px-5 py-3 text-center">
                          {item.upgrading ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-chart-4/15 px-2.5 py-0.5 text-xs font-medium text-chart-4">
                              <Hammer className="h-3 w-3" /> Upgrading
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-chart-3/15 px-2.5 py-0.5 text-xs font-medium text-chart-3">
                              <CheckCircle2 className="h-3 w-3" /> Idle
                            </span>
                          )}
                        </td>
                      )}
                      <td className="px-5 py-3 text-right font-mono text-xs text-muted-foreground">{item.data_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Small Summary Card ── */
function SummaryCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="glass rounded-xl px-5 py-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        {icon}
        {label}
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
