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
} from "lucide-react";

/* ── Types ── */
interface BuildingData {
  data_id: number;
  name: string;
  level: number;
  upgrading: boolean;
}

interface ParsedResult {
  total_buildings: number;
  busy_builders: number;
  town_hall_level: number | null;
  buildings: BuildingData[];
}

/* ── Data-ID → Human-Readable Name Mapping ── */
const DATA_ID_MAP: Record<number, string> = {
  // Resource & Core
  1000001: "Town Hall",
  1000000: "Elixir Collector",
  1000002: "Elixir Storage",
  1000003: "Gold Mine",
  1000004: "Gold Storage",
  1000014: "Army Camp",
  1000015: "Barracks",
  1000013: "Laboratory",
  1000007: "Builder's Hut",
  1000023: "Spell Factory",
  1000024: "Dark Spell Factory",
  1000025: "Dark Barracks",
  1000029: "Workshop",
  1000030: "Pet House",
  1000034: "Clan Castle",

  // Defenses
  1000005: "Wall",
  1000006: "Bomb",
  1000008: "Cannon",
  1000009: "Archer Tower",
  1000010: "Mortar",
  1000011: "Air Defense",
  1000012: "Wizard Tower",
  1000019: "Hidden Tesla",
  1000020: "X-Bow",
  1000021: "Inferno Tower",
  1000022: "Eagle Artillery",
  1000031: "Scattershot",
  1000032: "Giga Tesla",
  1000033: "Giga Inferno",

  // Traps
  1000016: "Spring Trap",
  1000017: "Air Bomb",
  1000018: "Giant Bomb",
  1000035: "Seeking Air Mine",
  1000036: "Tornado Trap",

  // Heroes
  1000026: "Barbarian King Altar",
  1000027: "Archer Queen Altar",
  1000028: "Grand Warden Altar",
  1000037: "Royal Champion Altar",
};

function resolveName(dataId: number): string {
  return DATA_ID_MAP[dataId] ?? `Unknown (${dataId})`;
}

/* ── Flexible JSON Parser ──
   Handles multiple formats:
   1. { "buildings": [{ "dataId": ..., "lvl": ... }] }
   2. Array of buildings directly: [{ "dataId": ..., "lvl": ... }]
   3. Nested in any key that contains building-like objects
   4. Objects with "data_id"/"id" instead of "dataId"
   5. Objects with "level" instead of "lvl"
*/
function extractBuildings(data: unknown): { dataId: number; lvl: number; timer: number }[] {
  // If it's an array, check if items look like buildings
  if (Array.isArray(data)) {
    const buildings = data
      .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
      .filter((item) => {
        const hasId = "dataId" in item || "data_id" in item || "id" in item;
        const hasLevel = "lvl" in item || "level" in item || "lv" in item;
        return hasId && hasLevel;
      })
      .map((item) => ({
        dataId: Number(item.dataId ?? item.data_id ?? item.id ?? 0),
        lvl: Number(item.lvl ?? item.level ?? item.lv ?? 0),
        timer: Number(item.timer ?? item.remaining ?? item.upgradeTime ?? 0),
      }));

    if (buildings.length > 0) return buildings;
  }

  // If it's an object, search known keys or recurse
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>;

    // Check common keys first
    const priorityKeys = ["buildings", "building_data", "buildingData", "village", "layout"];
    for (const key of priorityKeys) {
      if (key in obj) {
        const result = extractBuildings(obj[key]);
        if (result.length > 0) return result;
      }
    }

    // Fallback: search all keys
    for (const key of Object.keys(obj)) {
      if (priorityKeys.includes(key)) continue; // already checked
      const result = extractBuildings(obj[key]);
      if (result.length > 0) return result;
    }
  }

  return [];
}

function parseVillageClientSide(raw: unknown): ParsedResult {
  const buildings = extractBuildings(raw);

  if (buildings.length === 0) {
    throw new Error(
      "Could not find building data in the JSON. Expected an array of objects with " +
      "\"dataId\" (or \"data_id\") and \"lvl\" (or \"level\") fields. " +
      "Try pasting the sample to see the expected format."
    );
  }

  let busyBuilders = 0;
  let townHallLevel: number | null = null;

  const buildingsSummary: BuildingData[] = buildings.map((b) => {
    const isUpgrading = (b.timer ?? 0) > 0;
    if (isUpgrading) busyBuilders++;

    // Detect Town Hall level
    if (b.dataId === 1000001) {
      townHallLevel = b.lvl;
    }

    return {
      data_id: b.dataId,
      name: resolveName(b.dataId),
      level: b.lvl,
      upgrading: isUpgrading,
    };
  });

  return {
    total_buildings: buildingsSummary.length,
    busy_builders: busyBuilders,
    town_hall_level: townHallLevel,
    buildings: buildingsSummary,
  };
}

/* ── Sample JSON for the placeholder ── */
const SAMPLE_JSON = JSON.stringify(
  {
    buildings: [
      { dataId: 1000001, lvl: 12, timer: 0 },
      { dataId: 1000008, lvl: 15, timer: 3600 },
      { dataId: 1000009, lvl: 14, timer: 0 },
      { dataId: 1000010, lvl: 10, timer: 7200 },
      { dataId: 1000019, lvl: 9, timer: 0 },
      { dataId: 1000011, lvl: 10, timer: 0 },
      { dataId: 1000012, lvl: 11, timer: 0 },
      { dataId: 1000020, lvl: 5, timer: 0 },
      { dataId: 1000021, lvl: 4, timer: 14400 },
      { dataId: 1000026, lvl: 50, timer: 0 },
      { dataId: 1000027, lvl: 45, timer: 0 },
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

  function handleSubmit() {
    setError(null);
    setResult(null);

    /* ── Validate JSON locally first ── */
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonInput);
    } catch {
      setError("Invalid JSON — please check your syntax and try again.");
      return;
    }

    setLoading(true);

    try {
      /* Parse entirely client-side — instant, no network needed */
      const data = parseVillageClientSide(parsed);
      setResult(data);
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
        Paste your village export JSON to decode building IDs, levels, and
        builder status. Parsing happens <strong>instantly</strong> in your browser.
      </p>

      {/* ── Input Card ── */}
      <div className="glass rounded-2xl p-6 mb-6" id="village-input-card">
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="village-json"
            className="text-sm font-medium text-foreground"
          >
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
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {loading ? "Parsing…" : "Analyse"}
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div
          className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          id="village-error"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Results ── */}
      {result && (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" id="village-results">
          {/* Summary row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {result.town_hall_level !== null && (
              <SummaryCard
                label="Town Hall"
                value={result.town_hall_level}
                icon={<Castle className="h-4 w-4 text-chart-2" />}
              />
            )}
            <SummaryCard
              label="Total Buildings"
              value={result.total_buildings}
              icon={<Castle className="h-4 w-4 text-chart-1" />}
            />
            <SummaryCard
              label="Busy Builders"
              value={result.busy_builders}
              icon={<Hammer className="h-4 w-4 text-chart-4" />}
            />
            <SummaryCard
              label="Idle"
              value={result.total_buildings - result.busy_builders}
              icon={<CheckCircle2 className="h-4 w-4 text-chart-3" />}
            />
          </div>

          {/* Building table */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" id="buildings-table">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3">Building</th>
                    <th className="px-5 py-3 text-center">Level</th>
                    <th className="px-5 py-3 text-center">Status</th>
                    <th className="px-5 py-3 text-right">Data ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {result.buildings.map((b, i) => (
                    <tr
                      key={`${b.data_id}-${i}`}
                      className="transition-colors hover:bg-accent/40"
                    >
                      <td className="px-5 py-3 font-medium">{b.name}</td>
                      <td className="px-5 py-3 text-center">
                        <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-lg bg-primary/10 px-2 text-xs font-bold text-primary">
                          {b.level}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        {b.upgrading ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-chart-4/15 px-2.5 py-0.5 text-xs font-medium text-chart-4">
                            <Hammer className="h-3 w-3" />
                            Upgrading
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-chart-3/15 px-2.5 py-0.5 text-xs font-medium text-chart-3">
                            <CheckCircle2 className="h-3 w-3" />
                            Idle
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right font-mono text-xs text-muted-foreground">
                        {b.data_id}
                      </td>
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
function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
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
