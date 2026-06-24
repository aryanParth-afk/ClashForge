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
  buildings: BuildingData[];
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

  async function handleSubmit() {
    setError(null);
    setResult(null);

    /* ── Validate JSON locally first ── */
    let parsed: object;
    try {
      parsed = JSON.parse(jsonInput);
    } catch {
      setError("Invalid JSON — please check your syntax and try again.");
      return;
    }

    setLoading(true);

    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const res = await fetch(`${API}/api/v1/parse-village`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.detail ?? `Server returned ${res.status}`
        );
      }

      const data: ParsedResult = await res.json();
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
        builder status.
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
