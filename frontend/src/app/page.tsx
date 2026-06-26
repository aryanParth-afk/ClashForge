"use client";

import { Swords, ArrowRight, Shield, Zap, ChevronDown, Sword, Flame, ShieldAlert, Dog, FlaskConical, Crown, X, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CLASH_DATA, CLASH_DESCRIPTIONS, CategoryKey } from "@/lib/clash-data";

const CATEGORY_CONFIG: Record<CategoryKey, { label: string; icon: React.ReactNode }> = {
  heroes: { label: "Heroes", icon: <Crown className="w-4 h-4" /> },
  elixir_troops: { label: "Elixir Troops", icon: <Sword className="w-4 h-4" /> },
  dark_troops: { label: "Dark Troops", icon: <Flame className="w-4 h-4" /> },
  super_troops: { label: "Super Troops", icon: <Zap className="w-4 h-4" /> },
  builder_troops: { label: "Builder Troops", icon: <Swords className="w-4 h-4" /> },
  capital_troops: { label: "Capital Troops", icon: <Shield className="w-4 h-4" /> },
  siege_machines: { label: "Siege Machines", icon: <ShieldAlert className="w-4 h-4" /> },
  pets: { label: "Pets", icon: <Dog className="w-4 h-4" /> },
  spells: { label: "Spells", icon: <FlaskConical className="w-4 h-4" /> },
  buildings: { label: "Buildings", icon: <Home className="w-4 h-4" /> }
};

function getUnitImageUrl(name: string) {
  return `/api/image-proxy?name=${encodeURIComponent(name)}`;
}

function UnitImage({ name }: { name: string }) {
  const [error, setError] = useState(false);
  
  if (error) {
    return <span className="text-4xl font-black text-primary/50">{name.substring(0, 2).toUpperCase()}</span>;
  }
  
  return (
    <img 
      src={getUnitImageUrl(name)} 
      alt={name}
      className="w-full h-full object-contain drop-shadow-2xl scale-110"
      onError={() => setError(true)}
    />
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <main className="relative flex flex-col w-full">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-4/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-chart-2/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse" style={{ animationDelay: "4s" }}></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
          <div className="flex items-center justify-center gap-6 mb-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-chart-1/10 border border-chart-1/20 shadow-lg rotate-[-10deg] hover:rotate-0 transition-transform">
              <Shield className="h-8 w-8 text-chart-1" />
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 border border-primary/30 shadow-[0_0_30px_rgba(45,212,191,0.3)] z-10">
              <Swords className="h-10 w-10 text-primary" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-chart-5/10 border border-chart-5/20 shadow-lg rotate-[10deg] hover:rotate-0 transition-transform">
              <Zap className="h-8 w-8 text-chart-5" />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl animate-in fade-in zoom-in-95 duration-1000 delay-150 fill-mode-both">
            Forge your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-3 to-chart-4">strategy.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            A premium, data-driven command centre for Clash of Clans.
            Automatically sync your base, analyse live clan data, and plan your upgrades.
          </p>

          <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-[0_0_40px_rgba(45,212,191,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(45,212,191,0.6)]"
            >
              Launch Dashboard
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-full border border-white/20"></div>
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground/60 animate-in fade-in duration-1000 delay-700 fill-mode-both">
            No sign-up required. Simply link your player tag.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-in fade-in duration-1000 delay-[1000ms] fill-mode-both">
          <span className="text-xs font-semibold uppercase tracking-widest">Explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </section>

      {/* ── The Armory (Encyclopedia Section) ── */}
      <section className="relative w-full bg-background/50 border-t border-border/50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">The Armory</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore the vast arsenal of Clash of Clans. View all units, heroes, spells, and equipment available to forge your perfect strategy.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {(Object.keys(CATEGORY_CONFIG) as CategoryKey[]).map((key) => {
              const config = CATEGORY_CONFIG[key];
              const isActive = activeCategory === key;
              
              return (
                <div key={key} className={`glass rounded-2xl border transition-all duration-300 ${isActive ? "border-primary/50 shadow-lg shadow-primary/5" : "border-border/50 shadow-sm"}`}>
                  <button
                    onClick={() => setActiveCategory(isActive ? null : key)}
                    className={`w-full flex items-center justify-between p-6 transition-colors rounded-2xl ${
                      isActive 
                        ? "bg-primary/5 text-foreground" 
                        : "hover:bg-accent/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl transition-colors ${isActive ? "bg-primary text-primary-foreground shadow-md" : "bg-background border border-border"}`}>
                        {config.icon}
                      </div>
                      <span className="text-xl font-bold tracking-tight">{config.label}</span>
                    </div>
                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isActive ? "rotate-180 text-primary" : ""}`} />
                  </button>

                  <div className={`grid transition-all duration-300 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="p-6 bg-background/20 border-t border-border/30 rounded-b-2xl">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {CLASH_DATA[key].map((item, i) => (
                            <button 
                              key={i} 
                              onClick={() => setSelectedItem(item)}
                              className="flex items-center justify-center text-center p-3 rounded-xl border border-border/40 bg-background/50 hover:bg-accent/40 hover:border-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer group shadow-sm"
                            >
                              <span className="font-semibold text-sm group-hover:text-primary transition-colors">{item}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Unit Modal ── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          ></div>
          <div className="relative w-full max-w-sm glass rounded-3xl border border-border/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors z-10"
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>
            <div className="p-8 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-chart-4/20 border border-primary/20 shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                <UnitImage name={selectedItem} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">{selectedItem}</h3>
              <p className="text-sm text-muted-foreground">
                {CLASH_DESCRIPTIONS[selectedItem] || "A powerful unit in the Clash of Clans universe."}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
