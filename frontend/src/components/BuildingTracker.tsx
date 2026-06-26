"use client";

import { useState, useEffect } from "react";
import { CLASH_DATA, BUILDING_UNLOCK_TH, BUILDING_MAX_COUNTS } from "@/lib/clash-data";
import { Hammer, Shield, Zap, Home, Minus, Plus, RefreshCw, CheckCircle2 } from "lucide-react";

interface BuildingTrackerProps {
  profile: any;
}

export function BuildingTracker({ profile }: BuildingTrackerProps) {
  const [isClient, setIsClient] = useState(false);
  const [buildingProgress, setBuildingProgress] = useState<Record<string, number>>({});
  
  const thLevel = profile.townHallLevel || 1;
  const storageKey = `clashforge_buildings_${profile.tag.replace('#', '')}`;

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setBuildingProgress(JSON.parse(saved));
      } catch (e) {}
    }
  }, [storageKey]);

  const updateProgress = (building: string, delta: number) => {
    setBuildingProgress(prev => {
      const current = prev[building] || 0;
      const maxAllowed = BUILDING_MAX_COUNTS[building]?.[Math.min(thLevel, 18)] || 1;
      const next = Math.max(0, Math.min(current + delta, maxAllowed));
      
      const newProgress = { ...prev, [building]: next };
      localStorage.setItem(storageKey, JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const resetProgress = () => {
    if (confirm("Are you sure you want to reset all your building progress for this tag?")) {
      setBuildingProgress({});
      localStorage.removeItem(storageKey);
    }
  };

  const getImageUrl = (name: string) => `/api/image-proxy?name=${encodeURIComponent(name)}`;

  const renderCategory = (title: string, icon: React.ReactNode, allBuildings: string[], colorClass: string) => {
    // Filter buildings that are unlocked at or below the player's TH level
    const unlockedBuildings = allBuildings.filter(b => (BUILDING_UNLOCK_TH[b] || 1) <= thLevel);
    
    if (unlockedBuildings.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className={`text-lg font-bold flex items-center gap-2 mb-4 ${colorClass}`}>
          {icon} {title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {unlockedBuildings.map(building => {
            const count = buildingProgress[building] || 0;
            const maxAllowed = BUILDING_MAX_COUNTS[building]?.[Math.min(thLevel, 18)] || 1;
            const isMaxed = count >= maxAllowed;

            return (
              <div key={building} className={`glass p-3 rounded-2xl border transition-all flex flex-col items-center group relative overflow-hidden ${isMaxed ? 'border-primary/50 shadow-[0_0_15px_rgba(251,146,60,0.1)]' : 'border-border/50 hover:border-primary/50'}`}>
                {isMaxed && (
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                )}
                
                <div className="relative w-16 h-16 mb-2 mt-2 flex items-center justify-center">
                  <img 
                    src={getImageUrl(building)} 
                    alt={building} 
                    className={`w-full h-full object-contain drop-shadow-md transition-transform ${isMaxed ? 'scale-105' : 'group-hover:scale-110'}`} 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('bg-muted/20', 'rounded-xl', 'border', 'border-border/50');
                      const icon = document.createElement('div');
                      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/></svg>`;
                      e.currentTarget.parentElement?.appendChild(icon.firstChild as Node);
                    }}
                  />
                  
                  <div className={`absolute -top-3 -right-3 text-xs font-bold px-2 py-0.5 flex items-center justify-center rounded-full shadow-lg ${isMaxed ? 'bg-primary text-primary-foreground' : 'bg-background border border-border text-foreground'}`}>
                    {count} <span className={`text-[10px] ml-0.5 ${isMaxed ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>/ {maxAllowed}</span>
                  </div>
                </div>
                
                <div className="text-xs font-semibold text-center h-8 flex items-center justify-center mb-2 z-10">
                  {building}
                </div>
                
                <div className="flex items-center gap-2 mt-auto w-full justify-center z-10">
                  <button 
                    onClick={() => updateProgress(building, -1)}
                    disabled={count === 0}
                    className="w-8 h-8 flex items-center justify-center bg-background rounded-lg border border-border disabled:opacity-50 hover:bg-destructive/20 hover:text-destructive hover:border-destructive transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => updateProgress(building, 1)}
                    disabled={isMaxed}
                    className="w-8 h-8 flex items-center justify-center bg-background rounded-lg border border-border disabled:opacity-50 transition-colors hover:bg-primary/20 hover:text-primary hover:border-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  const totalUpgraded = Object.values(buildingProgress).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-col gap-6 p-6 bg-background/10">
      
      {/* Sticky Header Bar */}
      <div className="glass p-6 rounded-2xl border border-border/50 sticky top-4 z-40 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Hammer className="w-5 h-5 text-chart-4" /> 
            Manual Building Tracker (TH{thLevel})
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Track how many buildings you've maxed for your Town Hall.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold flex items-center gap-1 text-primary">
              <CheckCircle2 className="w-4 h-4" /> {totalUpgraded} Maxed
            </span>
          </div>
          <button 
            onClick={resetProgress}
            className="flex items-center gap-1.5 text-xs text-destructive bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 px-3 py-2 rounded-lg transition-colors font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset All
          </button>
        </div>
      </div>

      <div className="mt-4">
        {renderCategory("Defenses", <Shield className="w-5 h-5" />, CLASH_DATA.buildings.defenses, "text-chart-2")}
        {renderCategory("Army", <Zap className="w-5 h-5" />, CLASH_DATA.buildings.army, "text-primary")}
        {renderCategory("Resources", <Home className="w-5 h-5" />, CLASH_DATA.buildings.resources, "text-chart-3")}
      </div>
    </div>
  );
}
