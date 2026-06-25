"use client";

import { useState, useEffect } from "react";
import { getLinkedProfile, setLinkedProfile, unlinkProfile } from "@/lib/profile-store";
import { Search, Loader2, User, Castle, Star, Trophy, AlertTriangle, Shield, LogOut, Hammer } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function DashboardPage() {
  const [linkedTag, setLinkedTag] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  
  const [player, setPlayer] = useState<any>(null);
  const [clan, setClan] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedTag = getLinkedProfile();
    if (savedTag) {
      setLinkedTag(savedTag);
      fetchDashboardData(savedTag);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchDashboardData(tag: string) {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Player
      const playerRes = await fetch(`/api/player?tag=${encodeURIComponent(tag)}`);
      const playerData = await playerRes.json();
      if (!playerRes.ok) throw new Error(playerData.error || "Failed to fetch player profile");
      
      setPlayer(playerData);

      // 2. Fetch Clan if player is in one
      if (playerData.clan?.tag) {
        const clanRes = await fetch(`${API}/api/v1/clan/${encodeURIComponent(playerData.clan.tag.replace(/^#/, ''))}`);
        const clanData = await clanRes.json();
        if (clanRes.ok) {
          setClan(clanData.data);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLink(e: React.FormEvent) {
    e.preventDefault();
    if (!tagInput.trim()) return;
    const cleanTag = tagInput.trim().toUpperCase();
    setLinkedProfile(cleanTag);
    setLinkedTag(`#${cleanTag.replace(/^#/, "")}`);
    fetchDashboardData(cleanTag);
  }

  function handleUnlink() {
    unlinkProfile();
    setLinkedTag(null);
    setPlayer(null);
    setClan(null);
  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-48" />
          </div>
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // --- NOT LINKED STATE ---
  if (!linkedTag) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 text-center border border-border/50 shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Link Your Profile</h1>
          <p className="mb-8 text-muted-foreground text-sm">
            Enter your Clash of Clans Player Tag to automatically load your base, stats, and clan every time you visit.
          </p>
          
          <form onSubmit={handleLink} className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="#P2G90Y2RQ"
                className="w-full rounded-xl border border-border bg-background/50 pl-12 pr-4 py-3.5 font-mono text-base text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
            <button
              type="submit"
              disabled={!tagInput.trim()}
              className="w-full rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed glow"
            >
              Link Account
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- LINKED STATE ---
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here is your latest data.</p>
        </div>
        <button 
          onClick={handleUnlink}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-lg transition-colors border border-destructive/20"
        >
          <LogOut className="w-4 h-4" /> Unlink Profile
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {player && (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          
          {/* Main Player Card */}
          <div className="glass rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 justify-between border border-border/50">
            <div className="flex items-center gap-4">
              {player.league && (
                <img src={player.league.iconUrls.small} alt={player.league.name} className="w-16 h-16 object-contain drop-shadow-md" />
              )}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-1">{player.name}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono">
                  <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/20 font-bold">{player.tag}</span>
                  <span className="flex items-center gap-1.5"><Castle className="w-4 h-4 text-chart-2" /> TH {player.townHallLevel}</span>
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-chart-4" /> LVL {player.expLevel}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 bg-background/50 rounded-xl border border-border/50 shadow-sm">
                <div className="text-xs text-muted-foreground mb-1 font-medium flex justify-center items-center gap-1"><Trophy className="w-3 h-3 text-chart-3" /> Trophies</div>
                <div className="text-xl font-bold">{player.trophies.toLocaleString()}</div>
              </div>
              <div className="text-center px-4 py-2 bg-background/50 rounded-xl border border-border/50 shadow-sm">
                <div className="text-xs text-muted-foreground mb-1 font-medium flex justify-center items-center gap-1"><Star className="w-3 h-3 text-chart-5" /> War Stars</div>
                <div className="text-xl font-bold">{player.warStars.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Upgrade Planner Link */}
            <Link href={`/player?tag=${encodeURIComponent(player.tag)}&tab=upgrades`} className="glass rounded-2xl p-6 border border-border/50 hover:bg-accent/40 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><Hammer className="w-5 h-5 text-chart-5" /> Upgrades</h3>
                <span className="text-xs font-medium bg-chart-5/10 text-chart-5 px-2 py-1 rounded">Planner</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                You have <strong className="text-foreground">{player.troops.filter((t: any) => t.village === "home" && t.level < t.maxLevel && !["Super Barbarian", "Super Archer", "Super Giant", "Sneaky Goblin", "Super Wall Breaker", "Rocket Balloon", "Super Wizard", "Super Dragon", "Inferno Dragon", "Super Minion", "Super Valkyrie", "Super Witch", "Ice Hound", "Super Bowler", "Super Miner", "Super Hog Rider", "Super Yeti"].includes(t.name)).length + player.spells.filter((s: any) => s.level < s.maxLevel).length + player.heroes.filter((h: any) => h.level < h.maxLevel).length + player.heroes.flatMap((h: any) => h.equipment || []).filter((e: any) => e.level < e.maxLevel).length}</strong> pending upgrades remaining for your current Town Hall.
              </p>
              <span className="text-sm font-semibold text-primary group-hover:underline">View Planner &rarr;</span>
            </Link>

            {/* Detailed Stats Link */}
            <Link href={`/player?tag=${encodeURIComponent(player.tag)}`} className="glass rounded-2xl p-6 border border-border/50 hover:bg-accent/40 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><User className="w-5 h-5 text-chart-1" /> Full Analyzer</h3>
                <span className="text-xs font-medium bg-chart-1/10 text-chart-1 px-2 py-1 rounded">Levels & Equip</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Dive deep into your exact troop levels, hero equipment, and spell max-levels in the full Player Analyzer view.
              </p>
              <span className="text-sm font-semibold text-primary group-hover:underline">Open Analyzer &rarr;</span>
            </Link>

            {/* Clan Summary Card */}
            {clan ? (
              <Link href={`/clan?tag=${encodeURIComponent(clan.tag)}`} className="glass rounded-2xl p-6 border border-border/50 hover:bg-accent/40 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-chart-2" /> Your Clan</h3>
                  <span className="text-xs font-medium bg-chart-2/10 text-chart-2 px-2 py-1 rounded">Lvl {clan.clanLevel}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  {clan.badgeUrls?.small && <img src={clan.badgeUrls.small} alt="Clan Badge" className="w-12 h-12" />}
                  <div>
                    <div className="font-bold">{clan.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{clan.tag}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-muted-foreground">Members</div>
                    <div className="font-bold">{clan.members}/50</div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary group-hover:underline">Open Clan Inspector &rarr;</span>
              </Link>
            ) : (
               <div className="glass rounded-2xl p-6 border border-border/50 opacity-60">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><Shield className="w-5 h-5" /> Your Clan</h3>
                </div>
                <p className="text-sm text-muted-foreground">You are not currently in a clan.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
