"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Loader2,
  AlertTriangle,
  Shield,
  Trophy,
  Swords,
  Database,
  Wifi,
  Crown,
  Medal,
  RefreshCw,
} from "lucide-react";

/* ── Types ── */
interface ClanMember {
  tag: string;
  name: string;
  role: string;
  expLevel: number;
  trophies: number;
  donations: number;
  donationsReceived: number;
  league?: { name: string; iconUrls?: { small?: string } };
}

interface ClanData {
  tag: string;
  name: string;
  description?: string;
  clanLevel: number;
  clanPoints: number;
  clanVersusPoints?: number;
  clanCapitalPoints?: number;
  warWins?: number;
  warWinStreak?: number;
  members: number;
  memberList?: ClanMember[];
  labels?: { name: string }[];
  badgeUrls?: { small?: string; medium?: string };
}

interface ClanResponse {
  source: "cache" | "api";
  data: ClanData;
}

/* ── Role config ── */
const ROLE_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  leader: { label: "Leader", color: "text-chart-4", icon: <Crown className="h-3 w-3" /> },
  coLeader: { label: "Co-Leader", color: "text-chart-1", icon: <Medal className="h-3 w-3" /> },
  admin: { label: "Elder", color: "text-chart-2", icon: <Shield className="h-3 w-3" /> },
  member: { label: "Member", color: "text-muted-foreground", icon: <Users className="h-3 w-3" /> },
};

function getRoleConfig(role: string) {
  return ROLE_CONFIG[role] ?? ROLE_CONFIG.member;
}

export default function ClanPage() {
  const [tagInput, setTagInput] = useState("");
  const [result, setResult] = useState<ClanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(forceRefresh = false) {
    const tag = tagInput.trim();
    if (!tag) return;

    setError(null);
    setResult(null);
    setLoading(true);

    try {
      /* Strip leading # — the backend normalises it anyway */
      const cleanTag = tag.replace(/^#/, "");
      const qs = forceRefresh ? "?force_refresh=true" : "";
      const res = await fetch(
        `http://localhost:8000/api/v1/clan/${encodeURIComponent(cleanTag)}${qs}`
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail ?? `Server returned ${res.status}`);
      }

      const data: ClanResponse = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch(false);
  }

  const clan = result?.data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/10">
          <Users className="h-5 w-5 text-chart-2" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Clan Inspector</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Enter a clan tag to fetch live stats, member roster, and trophy data.
      </p>

      {/* ── Search Card ── */}
      <div className="glass rounded-2xl p-6 mb-6" id="clan-search-card">
        <label
          htmlFor="clan-tag"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Clan Tag
        </label>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              #
            </span>
            <input
              id="clan-tag"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              placeholder="2YPQ0PGLY"
              className="w-full rounded-xl border border-border bg-background/50 py-2.5 pl-8 pr-4 text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          <button
            type="button"
            onClick={() => handleSearch(false)}
            disabled={loading || !tagInput.trim()}
            id="btn-search-clan"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed glow"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {loading ? "Searching…" : "Search"}
          </button>
          <button
            type="button"
            onClick={() => handleSearch(true)}
            disabled={loading || !tagInput.trim()}
            id="btn-force-refresh"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            title="Bypass cache and fetch fresh data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Force Refresh</span>
          </button>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div
          className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          id="clan-error"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Results ── */}
      {clan && (
        <div
          className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          id="clan-results"
        >
          {/* ── Clan header card ── */}
          <div className="glass rounded-2xl p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {/* Badge image or fallback */}
                {clan.badgeUrls?.medium ? (
                  <img
                    src={clan.badgeUrls.medium}
                    alt={`${clan.name} badge`}
                    className="h-16 w-16 rounded-xl"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{clan.name}</h2>
                  <p className="text-sm font-mono text-muted-foreground">
                    {clan.tag}
                  </p>
                </div>
              </div>

              {/* Source badge */}
              <SourceBadge source={result!.source} />
            </div>

            {clan.description && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground border-t border-border pt-4">
                {clan.description}
              </p>
            )}
          </div>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              label="Level"
              value={clan.clanLevel}
              icon={<Shield className="h-4 w-4 text-chart-2" />}
            />
            <StatCard
              label="Trophies"
              value={clan.clanPoints.toLocaleString()}
              icon={<Trophy className="h-4 w-4 text-chart-4" />}
            />
            <StatCard
              label="War Wins"
              value={clan.warWins ?? "—"}
              icon={<Swords className="h-4 w-4 text-chart-5" />}
            />
            <StatCard
              label="Members"
              value={`${clan.members}/50`}
              icon={<Users className="h-4 w-4 text-chart-1" />}
            />
          </div>

          {/* ── Member table ── */}
          {clan.memberList && clan.memberList.length > 0 && (
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-sm font-semibold">
                  Member Roster{" "}
                  <span className="text-muted-foreground font-normal">
                    ({clan.memberList.length})
                  </span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" id="members-table">
                  <thead>
                    <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-3">#</th>
                      <th className="px-5 py-3">Player</th>
                      <th className="px-5 py-3">Role</th>
                      <th className="px-5 py-3 text-center">Level</th>
                      <th className="px-5 py-3 text-right">Trophies</th>
                      <th className="px-5 py-3 text-right">Donated</th>
                      <th className="px-5 py-3 text-right">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {clan.memberList.map((m, i) => {
                      const role = getRoleConfig(m.role);
                      return (
                        <tr
                          key={m.tag}
                          className="transition-colors hover:bg-accent/40"
                        >
                          <td className="px-5 py-3 text-xs text-muted-foreground">
                            {i + 1}
                          </td>
                          <td className="px-5 py-3">
                            <div>
                              <span className="font-medium">{m.name}</span>
                              <span className="ml-2 text-xs font-mono text-muted-foreground">
                                {m.tag}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-medium ${role.color}`}
                            >
                              {role.icon}
                              {role.label}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <span className="inline-flex h-7 min-w-[2rem] items-center justify-center rounded-lg bg-primary/10 px-2 text-xs font-bold text-primary">
                              {m.expLevel}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right font-medium">
                            {m.trophies.toLocaleString()}
                          </td>
                          <td className="px-5 py-3 text-right text-chart-3">
                            {m.donations}
                          </td>
                          <td className="px-5 py-3 text-right text-chart-5">
                            {m.donationsReceived}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Source Badge ── */
function SourceBadge({ source }: { source: "cache" | "api" }) {
  const isCache = source === "cache";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        isCache
          ? "bg-chart-3/15 text-chart-3"
          : "bg-chart-1/15 text-chart-1"
      }`}
      id="source-badge"
    >
      {isCache ? (
        <Database className="h-3 w-3" />
      ) : (
        <Wifi className="h-3 w-3" />
      )}
      {isCache ? "Cached" : "Live API"}
    </span>
  );
}

/* ── Stat Card ── */
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
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
