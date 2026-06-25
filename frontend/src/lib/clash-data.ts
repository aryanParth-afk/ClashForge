export const CLASH_DATA = {
  heroes: [
    "Barbarian King", "Archer Queen", "Grand Warden", "Royal Champion", "Battle Machine", "Battle Copter", "Minion Prince", "Dragon Duke"
  ],
  elixir_troops: [
    "Barbarian", "Archer", "Goblin", "Giant", "Wall Breaker", "Balloon", 
    "Wizard", "Healer", "Dragon", "P.E.K.K.A", "Baby Dragon", "Miner", 
    "Electro Dragon", "Yeti", "Dragon Rider", "Electro Titan", "Root Rider", "Thrower", "Ruin Witch", "Logger Guardian", "Meteor Golem"
  ],
  dark_troops: [
    "Minion", "Hog Rider", "Valkyrie", "Golem", "Witch", "Lava Hound", 
    "Bowler", "Ice Golem", "Headhunter", "Apprentice Warden", "Druid", "Furnace"
  ],
  super_troops: [
    "Super Barbarian", "Super Archer", "Super Giant", "Sneaky Goblin", "Super Wall Breaker",
    "Rocket Balloon", "Super Wizard", "Super Dragon", "Inferno Dragon", "Super Minion",
    "Super Valkyrie", "Super Witch", "Ice Hound", "Super Bowler", "Super Miner", 
    "Super Hog Rider", "Super Yeti"
  ],
  builder_troops: [
    "Raged Barbarian", "Sneaky Archer", "Boxer Giant", "Beta Minion", "Bomber", 
    "Baby Dragon", "Cannon Cart", "Night Witch", "Drop Ship", "Power P.E.K.K.A", 
    "Hog Glider", "Electrofire Wizard"
  ],
  capital_troops: [
    "Sneaky Archer", "Battle Ram", "Minion Horde", "Super Barbarian", "Super Giant", 
    "Super Wizard", "Flying Machine", "Rocket Balloon", "Skeleton Barrel", 
    "Super Dragon", "Inferno Dragon", "Mountain Golem", "Mega Sparky", "Super Miner", "Hog Raider"
  ],
  siege_machines: [
    "Wall Wrecker", "Battle Blimp", "Stone Slammer", "Siege Barracks", 
    "Log Launcher", "Flame Flinger", "Battle Drill", "Sky Wagon", "Troop Launcher"
  ],
  pets: [
    "L.A.S.S.I", "Electro Owl", "Mighty Yak", "Unicorn", "Frosty", 
    "Diggy", "Poison Lizard", "Phoenix", "Spirit Fox", "Angry Jelly",
    "Sneezy", "Greedy Raven"
  ],
  spells: [
    "Lightning Spell", "Healing Spell", "Rage Spell", "Jump Spell", 
    "Freeze Spell", "Clone Spell", "Invisibility Spell", "Recall Spell", "Revive Spell",
    "Poison Spell", "Earthquake Spell", "Haste Spell", "Skeleton Spell", 
    "Bat Spell", "Overgrowth Spell", "Totem Spell", "Ice Block Spell"
  ]
};

export type CategoryKey = keyof typeof CLASH_DATA;
