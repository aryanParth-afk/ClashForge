"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Sword, AlertTriangle } from "lucide-react";
import { ArmyBuilder } from "@/components/ArmyBuilder";

export default function ArmyBuilderPage() {
  const [tagInput, setTagInput] = useState("");
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tag = params.get('tag');
      if (tag) {
        setTagInput(tag);
        performSearch(tag);
      }
    }
  }, []);

  async function performSearch(tag: string) {
    if (!tag.trim()) return;
    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      const res = await fetch(`/api/player?tag=${encodeURIComponent(tag)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch player profile");
      }

      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    performSearch(tagInput);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Sword className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Army Builder</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Enter a player tag to fetch your Town Hall capacity and build your ultimate attack strategy, complete with Heroes, Equipment, and Clan Castle.
      </p>

      {/* ── Input Card ── */}
      <div className="glass rounded-2xl p-6 mb-6">
        <form onSubmit={handleSearch} className="flex gap-3 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="e.g. #P8L0Y00L"
              className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !tagInput.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed glow shrink-0"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sword className="h-4 w-4" />}
            {loading ? "Loading…" : "Start Building"}
          </button>
        </form>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Army Builder Component ── */}
      {profile && (
        <div className="mt-8">
          <ArmyBuilder profile={profile} />
        </div>
      )}
    </div>
  );
}
