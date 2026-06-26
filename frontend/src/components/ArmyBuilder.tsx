"use client";

import { useState, useEffect } from "react";
import { Sparkles, Minus, Plus, Trash2, Crosshair, Castle, Save, Share2, Check, Download } from "lucide-react";
import { 
  TH_CAPACITIES, 
  META_ARMIES, 
  TROOP_HOUSING_SPACE, 
  SPELL_HOUSING_SPACE,
  CLASH_DATA,
  HEROES
} from "@/lib/clash-data";

interface SavedArmy {
  id: string;
  name: string;
  thLevel: number;
  troops: Record<string, number>;
  spells: Record<string, number>;
  ccTroops: Record<string, number>;
  ccSpells: Record<string, number>;
  heroes: Record<string, string[]>;
}

interface ArmyBuilderProps {
  profile: any;
}

export function ArmyBuilder({ profile }: ArmyBuilderProps) {
  const thLevel = profile.townHallLevel || 1;
  const capacity = TH_CAPACITIES[thLevel] || { camp: 320, spell: 11, cc: 50, ccSpell: 3 };
  
  const [selectedArmy, setSelectedArmy] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<"main" | "cc">("main");

  const [armyTroops, setArmyTroops] = useState<Record<string, number>>({});
  const [armySpells, setArmySpells] = useState<Record<string, number>>({});
  const [armyCcTroops, setArmyCcTroops] = useState<Record<string, number>>({});
  const [armyCcSpells, setArmyCcSpells] = useState<Record<string, number>>({});
  const [selectedHeroes, setSelectedHeroes] = useState<Record<string, string[]>>({});

  const [savedArmies, setSavedArmies] = useState<SavedArmy[]>([]);
  const [armyNameInput, setArmyNameInput] = useState("");
  const [shareCopied, setShareCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("clashforge_saved_armies");
    if (saved) {
      try {
        setSavedArmies(JSON.parse(saved));
      } catch (e) {}
    }

    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('shared_army');
    if (sharedData) {
      try {
        const decoded = JSON.parse(atob(sharedData));
        if (decoded.troops) setArmyTroops(decoded.troops);
        if (decoded.spells) setArmySpells(decoded.spells);
        if (decoded.ccTroops) setArmyCcTroops(decoded.ccTroops);
        if (decoded.ccSpells) setArmyCcSpells(decoded.ccSpells);
        if (decoded.heroes) setSelectedHeroes(decoded.heroes);
        
        window.history.replaceState({}, '', window.location.pathname + "?tag=" + encodeURIComponent(profile.tag.replace('#', '')));
      } catch (e) {
        console.error("Failed to parse shared army", e);
      }
    }
  }, [profile.tag]);

  const availableMetaArmies = META_ARMIES.filter(a => a.thLevel === thLevel);

  const totalTroopSpace = Object.entries(armyTroops).reduce((sum, [name, count]) => sum + (TROOP_HOUSING_SPACE[name] || 1) * count, 0);
  const totalSpellSpace = Object.entries(armySpells).reduce((sum, [name, count]) => sum + (SPELL_HOUSING_SPACE[name] || 1) * count, 0);
  const totalCcTroopSpace = Object.entries(armyCcTroops).reduce((sum, [name, count]) => sum + (TROOP_HOUSING_SPACE[name] || 1) * count, 0);
  const totalCcSpellSpace = Object.entries(armyCcSpells).reduce((sum, [name, count]) => sum + (SPELL_HOUSING_SPACE[name] || 1) * count, 0);

  const handleLoadArmy = (armyId: string) => {
    const army = availableMetaArmies.find(a => a.id === armyId);
    if (!army) return;
    
    const newTroops: Record<string, number> = {};
    army.troops.forEach(t => newTroops[t.name] = t.count);
    setArmyTroops(newTroops);

    const newSpells: Record<string, number> = {};
    army.spells.forEach(s => newSpells[s.name] = s.count);
    setArmySpells(newSpells);

    const newCcTroops: Record<string, number> = {};
    (army.ccTroops || []).forEach(t => newCcTroops[t.name] = t.count);
    setArmyCcTroops(newCcTroops);

    const newCcSpells: Record<string, number> = {};
    (army.ccSpells || []).forEach(s => newCcSpells[s.name] = s.count);
    setArmyCcSpells(newCcSpells);
    
    const newHeroes: Record<string, string[]> = {};
    if (army.heroes) {
      army.heroes.forEach(h => newHeroes[h.name] = h.equipments);
    }
    setSelectedHeroes(newHeroes);
    
    setSelectedArmy(armyId);
  };

  const updateCount = (type: "troop" | "spell", name: string, delta: number) => {
    if (selectionMode === "main") {
      if (type === "troop") {
        const space = TROOP_HOUSING_SPACE[name] || 1;
        if (delta > 0 && totalTroopSpace + space > capacity.camp) return;
        setArmyTroops(prev => {
          const val = (prev[name] || 0) + delta;
          const newObj = { ...prev };
          if (val <= 0) delete newObj[name]; else newObj[name] = val;
          return newObj;
        });
      } else {
        const space = SPELL_HOUSING_SPACE[name] || 1;
        if (delta > 0 && totalSpellSpace + space > capacity.spell) return;
        setArmySpells(prev => {
          const val = (prev[name] || 0) + delta;
          const newObj = { ...prev };
          if (val <= 0) delete newObj[name]; else newObj[name] = val;
          return newObj;
        });
      }
    } else {
      if (type === "troop") {
        const space = TROOP_HOUSING_SPACE[name] || 1;
        if (delta > 0 && totalCcTroopSpace + space > capacity.cc) return;
        setArmyCcTroops(prev => {
          const val = (prev[name] || 0) + delta;
          const newObj = { ...prev };
          if (val <= 0) delete newObj[name]; else newObj[name] = val;
          return newObj;
        });
      } else {
        const space = SPELL_HOUSING_SPACE[name] || 1;
        if (delta > 0 && totalCcSpellSpace + space > capacity.ccSpell) return;
        setArmyCcSpells(prev => {
          const val = (prev[name] || 0) + delta;
          const newObj = { ...prev };
          if (val <= 0) delete newObj[name]; else newObj[name] = val;
          return newObj;
        });
      }
    }
  };

  const clearArmy = () => {
    setArmyTroops({});
    setArmySpells({});
    setArmyCcTroops({});
    setArmyCcSpells({});
    setSelectedHeroes({});
    setSelectedArmy(null);
  };

  const toggleHero = (heroName: string) => {
    setSelectedHeroes(prev => {
      const next = { ...prev };
      if (next[heroName]) {
        delete next[heroName];
      } else {
        next[heroName] = [];
      }
      return next;
    });
  };

  const toggleEquipment = (heroName: string, equipment: string) => {
    setSelectedHeroes(prev => {
      const currentEquips = prev[heroName] || [];
      if (currentEquips.includes(equipment)) {
        return { ...prev, [heroName]: currentEquips.filter(e => e !== equipment) };
      } else {
        if (currentEquips.length >= 2) return prev; // Max 2
        return { ...prev, [heroName]: [...currentEquips, equipment] };
      }
    });
  };

  const handleSaveArmy = () => {
    if (!armyNameInput.trim()) return;
    const newSaved: SavedArmy = {
      id: Date.now().toString(),
      name: armyNameInput.trim(),
      thLevel,
      troops: armyTroops,
      spells: armySpells,
      ccTroops: armyCcTroops,
      ccSpells: armyCcSpells,
      heroes: selectedHeroes
    };
    
    const updated = [...savedArmies, newSaved];
    setSavedArmies(updated);
    localStorage.setItem("clashforge_saved_armies", JSON.stringify(updated));
    setArmyNameInput("");
  };

  const handleLoadSavedArmy = (army: SavedArmy) => {
    setArmyTroops(army.troops);
    setArmySpells(army.spells);
    setArmyCcTroops(army.ccTroops);
    setArmyCcSpells(army.ccSpells);
    setSelectedHeroes(army.heroes);
    setSelectedArmy(null);
  };

  const handleDeleteSavedArmy = (id: string) => {
    const updated = savedArmies.filter(a => a.id !== id);
    setSavedArmies(updated);
    localStorage.setItem("clashforge_saved_armies", JSON.stringify(updated));
  };

  const handleShareArmy = () => {
    const dataToShare = {
      troops: armyTroops,
      spells: armySpells,
      ccTroops: armyCcTroops,
      ccSpells: armyCcSpells,
      heroes: selectedHeroes
    };
    const encoded = btoa(JSON.stringify(dataToShare));
    const url = new URL(window.location.href);
    url.searchParams.set('shared_army', encoded);
    
    navigator.clipboard.writeText(url.toString());
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const getImageUrl = (name: string) => `/api/image-proxy?name=${encodeURIComponent(name)}`;

  const renderUnitSelector = (name: string, type: "troop" | "spell") => {
    const space = type === "troop" ? TROOP_HOUSING_SPACE[name] : SPELL_HOUSING_SPACE[name];
    if (!space) return null;

    const currentCount = selectionMode === "main" 
      ? (type === "troop" ? (armyTroops[name] || 0) : (armySpells[name] || 0))
      : (type === "troop" ? (armyCcTroops[name] || 0) : (armyCcSpells[name] || 0));

    const totalSpace = selectionMode === "main" 
      ? (type === "troop" ? totalTroopSpace : totalSpellSpace) 
      : (type === "troop" ? totalCcTroopSpace : totalCcSpellSpace);

    const maxCapacity = selectionMode === "main" 
      ? (type === "troop" ? capacity.camp : capacity.spell) 
      : (type === "troop" ? capacity.cc : capacity.ccSpell);

    return (
      <div key={name} className="flex flex-col items-center p-2 glass rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
        <div className="relative w-12 h-12 mb-2">
          <img src={getImageUrl(name)} alt={name} className="w-full h-full object-contain drop-shadow-md" />
          {currentCount > 0 && (
            <span className={`absolute -top-2 -right-2 text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-full ${selectionMode === 'cc' ? 'bg-chart-2' : 'bg-primary'}`}>
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
            disabled={totalSpace + space > maxCapacity}
            className={`w-6 h-6 flex items-center justify-center bg-background rounded border border-border disabled:opacity-50 transition-colors ${selectionMode === 'cc' ? 'hover:bg-chart-2/20 hover:text-chart-2 hover:border-chart-2' : 'hover:bg-primary/20 hover:text-primary hover:border-primary'}`}
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
                
                <div className="flex gap-2 flex-wrap mb-2">
                  {army.troops.map(t => (
                    <div key={`t_${t.name}`} className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-md text-xs font-semibold border border-border/30">
                      <img src={getImageUrl(t.name)} className="w-4 h-4 object-contain" /> {t.count}
                    </div>
                  ))}
                  {army.spells.map(s => (
                    <div key={`s_${s.name}`} className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-md text-xs font-semibold border border-border/30">
                      <img src={getImageUrl(s.name)} className="w-4 h-4 object-contain" /> {s.count}
                    </div>
                  ))}
                </div>

                {(army.ccTroops?.length || army.ccSpells?.length) ? (
                  <div className="flex gap-2 flex-wrap items-center pt-2 border-t border-border/50">
                    <Castle className="w-3.5 h-3.5 text-chart-2" />
                    {army.ccTroops?.map(t => (
                      <div key={`cc_t_${t.name}`} className="flex items-center gap-1 bg-chart-2/10 text-chart-2 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-chart-2/20">
                        <img src={getImageUrl(t.name)} className="w-3 h-3 object-contain" /> {t.count}
                      </div>
                    ))}
                    {army.ccSpells?.map(s => (
                      <div key={`cc_s_${s.name}`} className="flex items-center gap-1 bg-chart-2/10 text-chart-2 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-chart-2/20">
                        <img src={getImageUrl(s.name)} className="w-3 h-3 object-contain" /> {s.count}
                      </div>
                    ))}
                  </div>
                ) : null}

                {army.heroes?.length ? (
                  <div className="flex gap-2 flex-wrap items-center pt-2 border-t border-border/50 mt-2">
                    {army.heroes.map(h => (
                      <div key={`meta_h_${h.name}`} className="flex items-center gap-1 bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-semibold border border-primary/20">
                        <img src={getImageUrl(h.name)} className="w-3 h-3 object-contain" /> 
                        {h.equipments.map(eq => (
                          <img key={eq} src={getImageUrl(eq)} title={eq} className="w-3 h-3 object-contain ml-0.5" />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Armies Section */}
      {isClient && savedArmies.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-border/20">
          <h3 className="text-xl font-bold flex items-center gap-2 text-chart-3">
            <Save className="w-5 h-5" /> Your Saved Armies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedArmies.map(army => (
              <div 
                key={army.id} 
                className="glass p-4 rounded-2xl border border-border/50 hover:border-chart-3/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-bold text-lg mb-1 text-foreground flex items-center justify-between">
                    {army.name}
                    <span className="text-xs bg-background/50 px-2 py-0.5 rounded text-muted-foreground border border-border">TH{army.thLevel}</span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap my-3">
                    {Object.entries(army.troops).map(([name, count]) => (
                      <div key={`s_t_${name}`} className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-md text-xs font-semibold border border-border/30">
                        <img src={getImageUrl(name)} className="w-4 h-4 object-contain" /> {count}
                      </div>
                    ))}
                    {Object.entries(army.spells).map(([name, count]) => (
                      <div key={`s_s_${name}`} className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded-md text-xs font-semibold border border-border/30">
                        <img src={getImageUrl(name)} className="w-4 h-4 object-contain" /> {count}
                      </div>
                    ))}
                  </div>

                  {(Object.keys(army.ccTroops).length > 0 || Object.keys(army.ccSpells).length > 0) ? (
                    <div className="flex gap-2 flex-wrap items-center pt-2 border-t border-border/50">
                      <Castle className="w-3.5 h-3.5 text-chart-2" />
                      {Object.entries(army.ccTroops).map(([name, count]) => (
                        <div key={`s_cc_t_${name}`} className="flex items-center gap-1 bg-chart-2/10 text-chart-2 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-chart-2/20">
                          <img src={getImageUrl(name)} className="w-3 h-3 object-contain" /> {count}
                        </div>
                      ))}
                      {Object.entries(army.ccSpells).map(([name, count]) => (
                        <div key={`s_cc_s_${name}`} className="flex items-center gap-1 bg-chart-2/10 text-chart-2 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-chart-2/20">
                          <img src={getImageUrl(name)} className="w-3 h-3 object-contain" /> {count}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {Object.keys(army.heroes || {}).length > 0 ? (
                    <div className="flex gap-2 flex-wrap items-center pt-2 border-t border-border/50 mt-2">
                      {Object.entries(army.heroes).map(([name, equips]) => (
                        <div key={`s_h_${name}`} className="flex items-center gap-1 bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-semibold border border-primary/20">
                          <img src={getImageUrl(name)} className="w-3 h-3 object-contain" /> 
                          {equips.map(eq => (
                            <img key={eq} src={getImageUrl(eq)} title={eq} className="w-3 h-3 object-contain ml-0.5" />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border/30">
                  <button 
                    onClick={() => handleDeleteSavedArmy(army.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                  <button 
                    onClick={() => handleLoadSavedArmy(army)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold bg-chart-3/10 text-chart-3 border border-chart-3/20 hover:bg-chart-3/20 transition-colors"
                  >
                    <Download className="w-3 h-3" /> Load Army
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Builder Status Bars */}
      <div className="glass p-6 rounded-2xl border border-border/50 sticky top-4 z-40 backdrop-blur-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="font-bold text-lg">Current Army</h3>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-background/50 rounded-lg border border-border/50 overflow-hidden">
              <input 
                type="text" 
                placeholder="Name your army..." 
                value={armyNameInput}
                onChange={e => setArmyNameInput(e.target.value)}
                className="bg-transparent text-sm px-3 py-1.5 w-32 sm:w-40 focus:outline-none"
              />
              <button 
                onClick={handleSaveArmy}
                disabled={!armyNameInput.trim()}
                className="px-3 py-1.5 bg-chart-3/10 text-chart-3 hover:bg-chart-3/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-bold border-l border-border/50 flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" /> Save
              </button>
            </div>
            
            <button 
              onClick={handleShareArmy}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${shareCopied ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-primary text-primary-foreground hover:brightness-110'}`}
            >
              {shareCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {shareCopied ? "Copied!" : "Share Link"}
            </button>

            <button 
              onClick={clearArmy}
              className="flex items-center gap-1 text-xs text-destructive bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 px-3 py-1.5 rounded-lg transition-colors ml-auto sm:ml-2"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Army Capacity */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Main Army</h4>
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

          {/* Clan Castle Capacity */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-chart-2 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Castle className="w-4 h-4" /> Clan Castle
            </h4>
            <div>
              <div className="flex justify-between text-sm mb-1 font-semibold">
                <span className="text-muted-foreground">CC Troops Capacity</span>
                <span className={totalCcTroopSpace === capacity.cc ? 'text-chart-2' : 'text-foreground'}>
                  {totalCcTroopSpace} / {capacity.cc}
                </span>
              </div>
              <div className="h-2.5 w-full bg-background rounded-full overflow-hidden border border-border/30">
                <div 
                  className={`h-full transition-all duration-300 ${totalCcTroopSpace === capacity.cc ? 'bg-chart-2' : 'bg-chart-4'}`}
                  style={{ width: `${Math.min(100, (totalCcTroopSpace / Math.max(1, capacity.cc)) * 100)}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1 font-semibold">
                <span className="text-muted-foreground">CC Spell Capacity</span>
                <span className={totalCcSpellSpace === capacity.ccSpell ? 'text-chart-2' : 'text-foreground'}>
                  {totalCcSpellSpace} / {capacity.ccSpell}
                </span>
              </div>
              <div className="h-2.5 w-full bg-background rounded-full overflow-hidden border border-border/30">
                <div 
                  className={`h-full transition-all duration-300 ${totalCcSpellSpace === capacity.ccSpell ? 'bg-chart-2' : 'bg-chart-3'}`}
                  style={{ width: `${Math.min(100, (totalCcSpellSpace / Math.max(1, capacity.ccSpell)) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Troop Selector Grid */}
      <div className="space-y-6">
        
        {/* Toggle Switch */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-background/50 p-1 rounded-xl border border-border shadow-sm">
            <button 
              className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${selectionMode === "main" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setSelectionMode("main")}
            >
              Main Army
            </button>
            <button 
              className={`flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${selectionMode === "cc" ? "bg-chart-2 text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setSelectionMode("cc")}
            >
              <Castle className="w-4 h-4" /> Clan Castle
            </button>
          </div>
        </div>

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

        <div>
          <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-3">Heroes & Equipment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HEROES.map(hero => {
              const isSelected = selectedHeroes[hero.name] !== undefined;
              const currentEquips = selectedHeroes[hero.name] || [];
              return (
                <div key={hero.name} className={`glass p-4 rounded-xl border transition-colors ${isSelected ? 'border-primary shadow-[0_0_10px_rgba(45,212,191,0.1)]' : 'border-border/50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12">
                        <img src={getImageUrl(hero.name)} className={`w-full h-full object-contain ${!isSelected ? 'grayscale opacity-50' : 'drop-shadow-md'}`} />
                      </div>
                      <span className={`font-bold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>{hero.name}</span>
                    </div>
                    <button
                      onClick={() => toggleHero(hero.name)}
                      className={`px-4 py-1.5 rounded text-xs font-bold transition-colors ${isSelected ? 'bg-destructive/10 text-destructive hover:bg-destructive/20' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                    >
                      {isSelected ? "Remove" : "Select Hero"}
                    </button>
                  </div>
                  
                  {isSelected && (
                    <div className="pt-3 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                        <span>Select Equipment (Max 2)</span>
                        <span className={currentEquips.length === 2 ? 'text-primary font-bold' : ''}>{currentEquips.length}/2</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hero.equipments.map(eq => {
                          const eqSelected = currentEquips.includes(eq);
                          return (
                            <button
                              key={eq}
                              onClick={() => toggleEquipment(hero.name, eq)}
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${eqSelected ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(45,212,191,0.2)]' : 'bg-background/50 border-border/50 text-muted-foreground hover:border-primary/50'}`}
                            >
                              <img src={getImageUrl(eq)} className="w-5 h-5 object-contain" />
                              {eq}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
