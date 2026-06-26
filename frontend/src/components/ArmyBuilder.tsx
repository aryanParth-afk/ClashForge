"use client";

import { useState } from "react";
import { Sparkles, Minus, Plus, Trash2, Crosshair } from "lucide-react";
import { 
  TH_CAPACITIES, 
  META_ARMIES, 
  TROOP_HOUSING_SPACE, 
  SPELL_HOUSING_SPACE,
  CLASH_DATA 
} from "@/lib/clash-data";

interface ArmyBuilderProps {
  profile: any;
}

export function ArmyBuilder({ profile }: ArmyBuilderProps) {
  const thLevel = profile.townHallLevel || 1;
  const capacity = TH_CAPACITIES[thLevel] || { camp: 320, spell: 11, cc: 50 };
  
  const [selectedArmy, setSelectedArmy] = useState<string | null>(null);
  const [armyTroops, setArmyTroops] = useState<Record<string, number>>({});
  const [armySpells, setArmySpells] = useState<Record<string, number>>({});

  const availableMetaArmies = META_ARMIES.filter(a => a.minTh <= thLevel);

  const totalTroopSpace = Object.entries(armyTroops).reduce((sum, [name, count]) => {
    return sum + (TROOP_HOUSING_SPACE[name] || 1) * count;
  }, 0);

  const totalSpellSpace = Object.entries(armySpells).reduce((sum, [name, count]) => {
    return sum + (SPELL_HOUSING_SPACE[name] || 1) * count;
  }, 0);

  const handleLoadArmy = (armyId: string) => {
    const army = availableMetaArmies.find(a => a.id === armyId);
    if (!army) return;
    
    const newTroops: Record<string, number> = {};
    army.troops.forEach(t => newTroops[t.name] = t.count);
    setArmyTroops(newTroops);

    const newSpells: Record<string, number> = {};
    army.spells.forEach(s => newSpells[s.name] = s.count);
    setArmySpells(newSpells);
    
    setSelectedArmy(armyId);
  };

  const updateCount = (type: "troop" | "spell", name: string, delta: number) => {
    if (type === "troop") {
      const space = TROOP_HOUSING_SPACE[name] || 1;
      if (delta > 0 && totalTroopSpace + space > capacity.camp) return;
      
      setArmyTroops(prev => {
        const val = (prev[name] || 0) + delta;
        const newObj = { ...prev };
        if (val <= 0) delete newObj[name];
        else newObj[name] = val;
        return newObj;
      });
    } else {
      const space = SPELL_HOUSING_SPACE[name] || 1;
      if (delta > 0 && totalSpellSpace + space > capacity.spell) return;
      
      setArmySpells(prev => {
        const val = (prev[name] || 0) + delta;
        const newObj = { ...prev };
        if (val <= 0) delete newObj[name];
        else newObj[name] = val;
        return newObj;
      });
    }
  };

  // Helper to render unit image
  const getImageUrl = (name: string) => `/api/image-proxy?name=${encodeURIComponent(name)}`;

  const renderUnitSelector = (name: string, type: "troop" | "spell") => {
    const space = type === "troop" ? TROOP_HOUSING_SPACE[name] : SPELL_HOUSING_SPACE[name];
    if (!space) return null; // Only show units with defined space

    const currentCount = type === "troop" ? (armyTroops[name] || 0) : (armySpells[name] || 0);

    return (
      <div key={name} className="flex flex-col items-center p-2 glass rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
        <div className="relative w-12 h-12 mb-2">
          <img src={getImageUrl(name)} alt={name} className="w-full h-full object-contain drop-shadow-md" />
          {currentCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-full">
              {currentCount}
            </span>
          )}
        </div>
        <div className="text-[10px] font-semibold text-center leading-tight h-8 flex items-center justify-center">
          {name}
        </div>
        <div className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1">
          <Crosshair className="w-3 h-3 text-chart-4" /> {space}
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <button 
            onClick={() => updateCount(type, name, -1)}
            disabled={currentCount === 0}
            className="w-6 h-6 flex items-center justify-center bg-background rounded border border-border disabled:opacity-50 hover:bg-destructive/20 hover:text-destructive hover:border-destructive transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button 
            onClick={() => updateCount(type, name, 1)}
            disabled={(type === "troop" && totalTroopSpace + space > capacity.camp) || (type === "spell" && totalSpellSpace + space > capacity.spell)}
            className="w-6 h-6 flex items-center justify-center bg-background rounded border border-border disabled:opacity-50 hover:bg-primary/20 hover:text-primary hover:border-primary transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 p-6 bg-background/10">
      
      {/* Meta Armies Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> Recommended Meta Armies for TH{thLevel}
        </h3>
        {availableMetaArmies.length === 0 ? (
          <p className="text-sm text-muted-foreground">No meta armies found for your Town Hall level.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableMetaArmies.map(army => (
              <div 
                key={army.id} 
                className={`glass p-4 rounded-2xl border cursor-pointer transition-all ${selectedArmy === army.id ? 'border-primary shadow-[0_0_15px_rgba(45,212,191,0.2)]' : 'border-border/50 hover:border-primary/50'}`}
                onClick={() => handleLoadArmy(army.id)}
              >
                <div className="font-bold text-lg mb-1 text-foreground">{army.name}</div>
                <div className="text-xs text-muted-foreground mb-4 line-clamp-2">{army.description}</div>
                
                <div className="flex gap-2 flex-wrap">
                  {army.troops.map(t => (
                    <div key={t.name} className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-md text-xs font-semibold border border-border/30">
                      <img src={getImageUrl(t.name)} className="w-4 h-4 object-contain" /> {t.count}
                    </div>
                  ))}
                  {army.spells.map(s => (
                    <div key={s.name} className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-md text-xs font-semibold border border-border/30">
                      <img src={getImageUrl(s.name)} className="w-4 h-4 object-contain" /> {s.count}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Builder Status Bars */}
      <div className="glass p-6 rounded-2xl border border-border/50 sticky top-4 z-10 backdrop-blur-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Current Army</h3>
          <button 
            onClick={() => { setArmyTroops({}); setArmySpells({}); setSelectedArmy(null); }}
            className="flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-2 py-1 rounded transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1 font-semibold">
              <span className="text-muted-foreground">Troops Capacity</span>
              <span className={totalTroopSpace === capacity.camp ? 'text-primary' : 'text-foreground'}>
                {totalTroopSpace} / {capacity.camp}
              </span>
            </div>
            <div className="h-2.5 w-full bg-background rounded-full overflow-hidden border border-border/30">
              <div 
                className={`h-full transition-all duration-300 ${totalTroopSpace === capacity.camp ? 'bg-primary' : 'bg-chart-4'}`}
                style={{ width: `${Math.min(100, (totalTroopSpace / Math.max(1, capacity.camp)) * 100)}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1 font-semibold">
              <span className="text-muted-foreground">Spell Capacity</span>
              <span className={totalSpellSpace === capacity.spell ? 'text-primary' : 'text-foreground'}>
                {totalSpellSpace} / {capacity.spell}
              </span>
            </div>
            <div className="h-2.5 w-full bg-background rounded-full overflow-hidden border border-border/30">
              <div 
                className={`h-full transition-all duration-300 ${totalSpellSpace === capacity.spell ? 'bg-primary' : 'bg-chart-3'}`}
                style={{ width: `${Math.min(100, (totalSpellSpace / Math.max(1, capacity.spell)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Troop Selector Grid */}
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-3">Elixir Troops</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {CLASH_DATA.elixir_troops.map(t => renderUnitSelector(t, "troop"))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-3">Dark Troops</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {CLASH_DATA.dark_troops.map(t => renderUnitSelector(t, "troop"))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-3">Super Troops</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {CLASH_DATA.super_troops.map(t => renderUnitSelector(t, "troop"))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-3">Spells</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {CLASH_DATA.spells.map(s => renderUnitSelector(s, "spell"))}
          </div>
        </div>
      </div>

    </div>
  );
}
