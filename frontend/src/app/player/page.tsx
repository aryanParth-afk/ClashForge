"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Loader2,
  Sparkles,
  Sword,
  Crown,
  FlaskConical,
  AlertTriangle,
  User,
  Castle,
  Trophy,
  Star,
  Hammer,
  Dog,
  ShieldAlert,
  Flame
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BuildingTracker } from "@/components/BuildingTracker";

const DARK_TROOPS = [
  "Minion", "Hog Rider", "Valkyrie", "Golem", "Witch", "Lava Hound", 
  "Bowler", "Ice Golem", "Headhunter", "Apprentice Warden", "Druid"
];

const SIEGE_MACHINES = [
  "Wall Wrecker", "Battle Blimp", "Stone Slammer", "Siege Barracks", 
  "Log Launcher", "Flame Flinger", "Battle Drill", "Sky Wagon", "Troop Launcher"
];

const PETS = [
  "L.A.S.S.I", "Electro Owl", "Mighty Yak", "Unicorn", "Frosty", 
  "Diggy", "Poison Lizard", "Phoenix", "Spirit Fox", "Angry Jelly",
  "Sneezy", "Greedy Raven"
];

const SUPER_TROOPS = [
  "Super Barbarian", "Super Archer", "Super Giant", "Sneaky Goblin", "Super Wall Breaker", 
  "Rocket Balloon", "Super Wizard", "Super Dragon", "Inferno Dragon", "Super Minion", 
  "Super Valkyrie", "Super Witch", "Ice Hound", "Super Bowler", "Super Miner", "Super Hog Rider",
  "Super Yeti"
];

interface CoCItem {
  name: string;
  level: number;
  maxLevel: number;
  village: "home" | "builderBase";
}

interface CoCHero extends CoCItem {
  equipment?: { name: string; level: number; maxLevel: number }[];
}

interface PlayerProfile {
  tag: string;
  name: string;
  townHallLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  builderHallLevel?: number;
  builderBaseTrophies?: number;
  league?: { name: string; iconUrls: { small: string } };
  heroes: CoCHero[];
  troops: CoCItem[];
  spells: CoCItem[];
}

export default function PlayerPage() {
  const [tagInput, setTagInput] = useState("");
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upgrades" | "buildings" | "heroes" | "elixir_troops" | "dark_troops" | "siege_machines" | "pets" | "builder_troops" | "spells">("heroes");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tag = params.get('tag');
      const tab = params.get('tab');
      if (tag) {
        setTagInput(tag);
        performSearch(tag, tab as any);
      }
    }
  }, []);

  async function performSearch(tag: string, tab?: "upgrades" | "buildings" | "heroes") {
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
      setActiveTab(tab || "heroes");
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

  const homeTroops = profile ? profile.troops.filter(t => t.village === "home" && !SUPER_TROOPS.includes(t.name)) : [];
  
  const pendingUpgrades = profile ? [
    ...profile.heroes.filter(h => h.level < h.maxLevel).map(h => ({ ...h, category: "Hero" })),
    ...profile.heroes.flatMap(h => (h.equipment || []).filter(e => e.level < e.maxLevel).map(e => ({ ...e, category: "Equipment", heroName: h.name }))),
    ...homeTroops.filter(t => t.level < t.maxLevel).map(t => ({ ...t, category: "Troop" })),
    ...profile.spells.filter(s => s.level < s.maxLevel).map(s => ({ ...s, category: "Spell" }))
  ].sort((a, b) => {
    // Sort by percentage to max (descending, meaning closest to max first)
    const aPercent = a.level / a.maxLevel;
    const bPercent = b.level / b.maxLevel;
    return bPercent - aPercent;
  }) : [];

  const tabs = profile ? [
    { key: "upgrades" as const, label: "Upgrades", count: pendingUpgrades.length, icon: <Hammer className="h-3.5 w-3.5 text-chart-5" /> },
    { key: "buildings" as const, label: "Buildings", count: 0, icon: <Castle className="h-3.5 w-3.5 text-chart-2" /> },
    { key: "heroes" as const, label: "Heroes", count: profile.heroes.length, icon: <Crown className="h-3.5 w-3.5" /> },
    { key: "elixir_troops" as const, label: "Elixir Troops", count: homeTroops.filter(t => !DARK_TROOPS.includes(t.name) && !SIEGE_MACHINES.includes(t.name) && !PETS.includes(t.name)).length, icon: <Sword className="h-3.5 w-3.5" /> },
    { key: "dark_troops" as const, label: "Dark Troops", count: homeTroops.filter(t => DARK_TROOPS.includes(t.name)).length, icon: <Flame className="h-3.5 w-3.5" /> },
    { key: "siege_machines" as const, label: "Siege Machines", count: homeTroops.filter(t => SIEGE_MACHINES.includes(t.name)).length, icon: <ShieldAlert className="h-3.5 w-3.5" /> },
    { key: "pets" as const, label: "Pets", count: homeTroops.filter(t => PETS.includes(t.name)).length, icon: <Dog className="h-3.5 w-3.5" /> },
    { key: "builder_troops" as const, label: "Builder Troops", count: profile.troops.filter(t => t.village === "builderBase").length, icon: <Hammer className="h-3.5 w-3.5" /> },
    { key: "spells" as const, label: "Spells", count: profile.spells.length, icon: <FlaskConical className="h-3.5 w-3.5" /> },
  ].filter(t => t.count > 0 || t.key === "upgrades") : [];

  const activeItems = profile && activeTab !== "upgrades" ? (
    activeTab === "heroes" ? profile.heroes :
    activeTab === "elixir_troops" ? homeTroops.filter(t => !DARK_TROOPS.includes(t.name) && !SIEGE_MACHINES.includes(t.name) && !PETS.includes(t.name)) :
    activeTab === "dark_troops" ? homeTroops.filter(t => DARK_TROOPS.includes(t.name)) :
    activeTab === "siege_machines" ? homeTroops.filter(t => SIEGE_MACHINES.includes(t.name)) :
    activeTab === "pets" ? homeTroops.filter(t => PETS.includes(t.name)) :
    activeTab === "builder_troops" ? profile.troops.filter(t => t.village === "builderBase") :
    profile.spells
  ) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Player Analyzer</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Enter any player tag to instantly view their 100% accurate profile, hero levels, and troops directly from the official Clash of Clans API.
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
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Searching…" : "Search"}
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

      {/* ── Skeleton Loader ── */}
      {loading && (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      )}

      {/* ── Results ── */}
      {profile && !loading && (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          {/* Profile Overview */}
          <div className="glass rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 justify-between border border-border/50">
            <div className="flex items-center gap-4">
              {profile.league && (
                <img src={profile.league.iconUrls.small} alt={profile.league.name} className="w-16 h-16 object-contain drop-shadow-md" />
              )}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-1">{profile.name}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono">
                  <span className="bg-muted/50 px-2.5 py-1 rounded-md border border-border/50">{profile.tag}</span>
                  <span className="flex items-center gap-1.5"><Castle className="w-4 h-4 text-chart-2" /> TH {profile.townHallLevel}</span>
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-chart-4" /> LVL {profile.expLevel}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 bg-background/50 rounded-xl border border-border/50 shadow-sm">
                <div className="text-xs text-muted-foreground mb-1 font-medium flex justify-center items-center gap-1"><Trophy className="w-3 h-3 text-chart-3" /> Trophies</div>
                <div className="text-xl font-bold">{profile.trophies.toLocaleString()}</div>
              </div>
              <div className="text-center px-4 py-2 bg-background/50 rounded-xl border border-border/50 shadow-sm">
                <div className="text-xs text-muted-foreground mb-1 font-medium flex justify-center items-center gap-1"><Star className="w-3 h-3 text-chart-5" /> War Stars</div>
                <div className="text-xl font-bold">{profile.warStars.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Tabbed data table */}
          <div className="glass rounded-2xl overflow-hidden shadow-lg border border-border/50">
            {/* Tab bar */}
            <div className="flex border-b border-border overflow-x-auto bg-background/20">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-primary text-primary bg-primary/10 shadow-[inset_0_-2px_0_var(--theme-primary)]"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.key !== "buildings" && (
                    <span className={`ml-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      activeTab === tab.key ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            {activeTab === "upgrades" ? (
              <div className="p-6 bg-background/10">
                {pendingUpgrades.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/10 text-chart-3 mb-4">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Fully Maxed!</h3>
                    <p>You have no upgrades remaining for your current Town Hall.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingUpgrades.map((item, i) => {
                      const percentage = Math.round((item.level / item.maxLevel) * 100);
                      const isHighProgress = percentage >= 80;
                      return (
                        <div key={i} className="glass p-4 rounded-xl border border-border/50 flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-base flex items-center gap-2">
                                {item.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {item.category} {('heroName' in item) ? `(${item.heroName})` : ''}
                              </div>
                            </div>
                            <span className="text-xs font-mono bg-background/50 px-2 py-1 rounded border border-border">
                              Lvl {item.level} <span className="text-muted-foreground">/ {item.maxLevel}</span>
                            </span>
                          </div>
                          
                          <div className="relative h-2 w-full bg-background rounded-full overflow-hidden border border-border/30">
                            <div 
                              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${isHighProgress ? 'bg-chart-3' : 'bg-primary'}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                            <span>{percentage}% complete</span>
                            <span>{item.maxLevel - item.level} levels left</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : activeTab === "buildings" ? (
              <div className="p-6">
                <BuildingTracker profile={profile} />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-background/40 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4 text-center">Level</th>
                      {activeTab === "heroes" && <th className="px-6 py-4">Equipment</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 bg-background/20">
                    {activeItems.map((item, i) => {
                      const isMax = item.level === item.maxLevel;
                      return (
                        <tr key={i} className="transition-colors hover:bg-accent/40 group">
                          <td className="px-6 py-4 font-medium text-foreground flex items-center gap-3">
                            {item.name}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <span className={`inline-flex h-8 min-w-[3rem] items-center justify-center rounded-lg px-2.5 text-sm font-bold shadow-sm border ${
                                isMax 
                                  ? "bg-chart-3/20 text-chart-3 border-chart-3/30 ring-1 ring-chart-3/20" 
                                  : "bg-primary/10 text-primary border-primary/20"
                              }`}>
                                {item.level}
                                {isMax && <Star className="w-3 h-3 ml-1 fill-current opacity-70" />}
                              </span>
                            </div>
                          </td>
                          {activeTab === "heroes" && (
                            <td className="px-6 py-4">
                              <div className="flex gap-2 flex-wrap">
                                {("equipment" in item && item.equipment && item.equipment.length > 0) ? (
                                  item.equipment.map((eq, j) => (
                                    <span key={j} className="inline-flex items-center gap-1.5 rounded-md bg-background/60 border border-border/60 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                                      <span className="text-foreground">{eq.name}</span>
                                      <span className={eq.level === eq.maxLevel ? "text-chart-3" : "text-primary/70"}>
                                        L{eq.level}
                                      </span>
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-muted-foreground/50 italic">No equipment</span>
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
