export const CLASH_DATA = {
  heroes: [
    "Barbarian King", "Archer Queen", "Grand Warden", "Royal Champion", "Battle Machine", "Battle Copter", "Minion Prince", "Dragon Duke"
  ],
  elixir_troops: [
    "Barbarian", "Archer", "Goblin", "Giant", "Wall Breaker", "Balloon",
    "Wizard", "Healer", "Dragon", "P.E.K.K.A", "Baby Dragon", "Miner",
    "Electro Dragon", "Yeti", "Dragon Rider", "Electro Titan", "Root Rider", "Thrower", "Meteor Golem"
  ],
  dark_troops: [
    "Minion", "Hog Rider", "Valkyrie", "Golem", "Witch", "Lava Hound",
    "Bowler", "Ice Golem", "Headhunter", "Apprentice Warden", "Druid", "Furnace", "Ruin Witch"
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
  ],
  buildings: {
    defenses: [
      "Cannon", "Archer Tower", "Mortar", "Air Defense", "Wizard Tower",
      "Air Sweeper", "Hidden Tesla", "Bomb Tower", "X-Bow", "Inferno Tower",
      "Eagle Artillery", "Scattershot", "Builder's Hut", "Spell Tower", "Monolith",
      "Multi-Archer Tower", "Ricochet Cannon"
    ],
    army: [
      "Army Camp", "Barracks", "Dark Barracks", "Laboratory",
      "Spell Factory", "Dark Spell Factory", "Siege Workshop", "Pet House"
    ],
    resources: [
      "Gold Mine", "Elixir Collector", "Dark Elixir Drill",
      "Gold Storage", "Elixir Storage", "Dark Elixir Storage",
      "Clan Castle", "Town Hall"
    ]
  }
};

export const CLASH_DESCRIPTIONS: Record<string, string> = {
  // Heroes
  "Barbarian King": "The Barbarian King is the toughest and meanest barbarian in all the realm, whose appetite for Dark Elixir has caused him to grow to a giant size.",
  "Archer Queen": "The Archer Queen is an eagle-eyed warrior, whose weapon of choice is a modified X-Bow that few men could dream of wielding.",
  "Grand Warden": "This veteran battle-scholar seeks out friendly groups of troops to fight behind and support with his Life Aura.",
  "Royal Champion": "Over the wall and at them! The Royal Champion is a fearless warrior who seeks out enemy defenses.",
  "Battle Machine": "The Master Builder's prize invention smashes enemy buildings to bits.",
  "Battle Copter": "A soaring machine that attacks from a distance and can rush in for a powerful bomb attack.",
  "Minion Prince": "A royal minion who fires deadly dark elixir projectiles.",
  "Dragon Duke": "A majestic dragon who commands the skies of the builder base.",

  // Elixir Troops
  "Barbarian": "This fearless warrior relies on his bulging muscles and striking mustache to wreak havoc in enemy villages.",
  "Archer": "These sharpshooters like to keep their distance on the battlefield and in life. Nothing makes them happier than single-mindedly taking down their target.",
  "Goblin": "These pesky little creatures only have eyes for one thing: LOOT!",
  "Giant": "These big guys may seem calm, but show them a turret or cannon and you'll see their fury unleashed!",
  "Wall Breaker": "Nothing warms a Wall Breaker's cold and undead heart like blowing up walls.",
  "Balloon": "These promoted skeletons have traded in their joy of destroying walls for a joy of destroying defenses from the sky.",
  "Wizard": "The Wizard is a terrifying presence on the battlefield. Pair him up with some of his fellows and cast concentrated blasts of destruction.",
  "Healer": "This majestic creature lives to protect and aid her fellow troops.",
  "Dragon": "The mighty Dragon is known throughout the land for its terrifying fire-breathing attacks.",
  "P.E.K.K.A": "Is P.E.K.K.A a knight? A samurai? A robot? No one knows! P.E.K.K.A's armor absorbs even the mightiest of blows.",
  "Baby Dragon": "This fire-breathing hatchling is shy around other air units, but left alone it will throw a tantrum!",
  "Miner": "These sneaky shovelers burrow underground, pass beneath walls and pop up right next to their targets.",
  "Electro Dragon": "Possessing scales of iron toughness and a breath of devastating lightning, the Electro Dragon likes to rain destruction from above.",
  "Yeti": "This heavy-hitting furball loves cold weather and his Yetimites.",
  "Dragon Rider": "A skeleton who learned to ride a mechanical dragon. What could possibly go wrong?",
  "Electro Titan": "She channels raw magical energy to whip enemies and emit a devastating electric aura.",
  "Root Rider": "Smashing through walls and riding on tough roots, she clears the path for her allies.",

  // Dark Troops
  "Minion": "This terror of the skies is born out of Dark Elixir. Undetectable by the Seeking Air Mine, Minions materialize with ease.",
  "Hog Rider": "He is a fast melee troop that rides a large pig and jumps over walls.",
  "Valkyrie": "A master of the two-handed axe, this glorious warrior runs between nearby buildings and can shred several troops or buildings at once.",
  "Golem": "The mighty Golem loves to soak up damage! When destroyed, it bursts into smaller Golemites.",
  "Witch": "The Witch never fights alone, constantly raising dead warriors.",
  "Lava Hound": "These fiery beasts can't resist chasing after Air Defenses, providing excellent protection for other troops.",
  "Bowler": "This big blue dude digs the simple things in life - Dark Elixir drinks and throwing massive boulders.",
  "Ice Golem": "The Ice Golem has a chilling personality and freezes everything around him when destroyed.",
  "Headhunter": "She has just one job: taking out enemy heroes. She throws deadly poisoned cards.",
  "Apprentice Warden": "A student of the Grand Warden who provides a supportive health aura to nearby troops.",
  "Druid": "A master of nature who can heal allies and transform into a powerful bear.",

  // Super Troops
  "Super Barbarian": "He's angrier, faster, and much stronger than a regular Barbarian.",
  "Super Archer": "Shoots piercing arrows that damage multiple buildings in a line.",
  "Super Giant": "A massive brawler who deals extra damage to walls.",
  "Sneaky Goblin": "Invisible for the first few seconds after deployment. Excellent for securing loot.",
  "Super Wall Breaker": "Guaranteed to detonate, even if destroyed before reaching the wall.",
  "Rocket Balloon": "Equipped with boosters to reach defenses at breakneck speeds.",
  "Super Wizard": "Fires a chain lightning attack that bounces to multiple nearby targets.",
  "Super Dragon": "A colossal beast that roasts its enemies with continuous blasts of fire.",
  "Inferno Dragon": "Fires a continuous beam that increases in damage over time.",
  "Super Minion": "A massive minion that fires deadly rockets from a safe distance.",
  "Super Valkyrie": "Drops a Rage Spell upon death to enrage her allies.",
  "Super Witch": "Summons a single, massive skeleton known as the Big Boy.",
  "Ice Hound": "Freezes its targets and slows down nearby defenses upon death.",
  "Super Bowler": "Throws an enormous boulder that bounces three times.",
  "Super Miner": "Uses a powerful drill that deals increasing damage over time and leaves a bomb.",
  "Super Hog Rider": "A reinforced Hog Rider that splits into a Hog and a Rider upon defeat.",
  "Super Yeti": "A giant Yeti with even more devastating Yetimites.",

  // Siege Machines
  "Wall Wrecker": "Designed to transport your Clan Castle troops straight to the heart of the enemy village while smashing walls.",
  "Battle Blimp": "Bypasses ground obstacles and flies directly towards the enemy Town Hall, dropping bombs along the way.",
  "Stone Slammer": "A heavy-duty flying mountain that targets defenses and causes massive splash damage.",
  "Siege Barracks": "Parachutes down to release extra P.E.K.K.As and Wizards before deploying Clan Castle troops.",
  "Log Launcher": "Hurls massive spiked logs that damage and crush everything in their path.",
  "Flame Flinger": "Lobs fire spirits over enemy walls, dealing massive damage from a safe distance.",
  "Battle Drill": "Burrows underground to stun and destroy enemy defenses.",

  // Pets
  "L.A.S.S.I": "A trusty robotic pup that can jump over walls and attack viciously.",
  "Electro Owl": "A high-voltage bird of prey that bounces lightning to a secondary target.",
  "Mighty Yak": "A rugged companion that deals extra damage to walls to pave the way.",
  "Unicorn": "A magical pony with a glowing horn that heals the Hero it accompanies.",
  "Frosty": "A chilly friend that throws frostmites to slow down enemy defenses.",
  "Diggy": "A tunneling pet that stuns the target its Hero is attacking.",
  "Poison Lizard": "A toxic reptile that spits fast-acting poison at defending Heroes and troops.",
  "Phoenix": "Rises from the ashes to revive its Hero with a burst of invulnerability.",
  "Spirit Fox": "A mystical companion that can turn itself and its Hero invisible to sneak past defenses.",
  "Angry Jelly": "A furious floating blob that amplifies its Hero's attacks but explodes in a sticky mess.",
  "Sneezy": "A congested companion whose powerful sneezes create gusts of wind that blow back enemies.",
  "Greedy Raven": "Always on the hunt for loot, this raven swoops down to snatch extra resources during battles.",

  // Custom/New Elixir Troops
  "Thrower": "A relentless troop equipped with a massive arm designed to hurl heavy projectiles over walls.",
  "Meteor Golem": "A flaming beast of molten rock that leaves a trail of fire and crushes defenses on impact.",

  // Custom/New Dark Troops
  "Furnace": "A walking cauldron of dark elixir that constantly spawns fiery spirits to overwhelm the enemy.",
  "Ruin Witch": "A dark sorceress who summons corrupted skeletons and curses enemy buildings to take more damage.",

  // Custom/New Siege Machines
  "Sky Wagon": "An aerial siege machine that drops a payload of devastating bombs before deploying Clan Castle troops.",
  "Troop Launcher": "A powerful contraption that literally fires your Clan Castle troops deep into the enemy base.",

  // Builder Troops
  "Raged Barbarian": "Starts off with a burst of furious rage, dealing massive damage and moving incredibly fast.",
  "Sneaky Archer": "Cloaked in a stealthy cape, she remains completely invisible to defenses for her first few attacks.",
  "Boxer Giant": "A heavyweight brawler whose first attack packs an unbelievable punch that shatters defenses.",
  "Beta Minion": "A genetically modified minion whose initial attacks strike from a longer, safer distance.",
  "Bomber": "Throws massive bouncing bombs that blow through multiple layers of walls with ease.",
  "Cannon Cart": "A cannon on wheels! Once destroyed, it transforms into a stationary turret for a final stand.",
  "Night Witch": "Summons swarms of flying bats to swarm defenses and bursts into a flock of bats when defeated.",
  "Drop Ship": "A skeletal hot air balloon that drops devastating skeletons right on top of enemy defenses.",
  "Power P.E.K.K.A": "Charged with volatile energy, her attacks unleash an overcharged blast that damages everything nearby.",
  "Hog Glider": "Swoops in over walls and stuns the first defense he hits before his hog takes over on the ground.",
  "Electrofire Wizard": "A master of dual elements who can switch between chaining electricity and a scorching inferno beam.",

  // Capital Troops
  "Battle Ram": "Four barbarians carrying a heavy log. They charge at the nearest wall and smash it to pieces!",
  "Minion Horde": "A massive swarm of flying Minions that can quickly overwhelm single-target air defenses.",
  "Flying Machine": "A rickety flying contraption that pelts ground defenses with a continuous barrage of attacks.",
  "Skeleton Barrel": "A balloon filled to the brim with skeletons. Once it pops, a massive skeletal army drops out.",
  "Mountain Golem": "An absolute behemoth of stone that crushes walls by simply walking over them.",
  "Mega Sparky": "A terrifyingly huge machine that charges up a massive blast of electricity to vaporize defenses.",
  "Hog Raider": "A specialized Hog Rider deployed in the Capital, expertly vaulting over massive walls.",

  // Spells
  "Lightning Spell": "Electrocute your enemies! Drop this spell to damage buildings and units in a concentrated area.",
  "Healing Spell": "Heal your troops to keep them in the fight! Cast this spell to create a Ring of Healing.",
  "Rage Spell": "Enrage your units to make them bigger, faster and stronger! Cast this to create a Ring of Rage.",
  "Jump Spell": "Walls slowing you down? Cast this spell to let your troops jump right over them!",
  "Freeze Spell": "When the heat is on, cast a Freeze Spell! It temporarily disables enemy defenses and troops.",
  "Clone Spell": "Turn this spell into a pop-up army! It spawns temporary copies of any troops that enter it.",
  "Invisibility Spell": "Hide your troops from enemy fire! Everything inside the ring becomes invisible and untargetable.",
  "Recall Spell": "Made a mistake? Use this spell to pull troops out of the battle so they can be redeployed elsewhere.",
  "Revive Spell": "Breathes new life into fallen troops, giving them a second chance to fight.",
  "Poison Spell": "Give your enemy's troops a toxic surprise! It damages and slows down defending Clan Castle troops.",
  "Earthquake Spell": "Shake the ground! It deals massive percentage damage to buildings and destroys walls instantly.",
  "Haste Spell": "Put some hustle in even your heaviest units! It boosts movement speed without the damage boost of Rage.",
  "Skeleton Spell": "Summon a surprise army of Skeletons anywhere on the battlefield!",
  "Bat Spell": "Summon an army of bats! They will seek out and distract or destroy enemy defenses.",
  "Overgrowth Spell": "Causes massive, thick roots to temporarily entangle and disable enemy defenses.",
  "Totem Spell": "Summons a magical totem that provides a defensive aura to your troops.",
  "Ice Block Spell": "Encases your troops in a protective block of ice, shielding them from fatal damage."
};

export const TROOP_HOUSING_SPACE: Record<string, number> = {
  // Elixir Troops
  "Barbarian": 1, "Archer": 1, "Goblin": 1, "Giant": 5, "Wall Breaker": 2, "Balloon": 5,
  "Wizard": 4, "Healer": 14, "Dragon": 20, "P.E.K.K.A": 25, "Baby Dragon": 10, "Miner": 6,
  "Electro Dragon": 30, "Yeti": 18, "Dragon Rider": 25, "Electro Titan": 32, "Root Rider": 20,
  "Thrower": 16, "Meteor Golem": 40, // custom 

  // Dark Troops
  "Minion": 2, "Hog Rider": 5, "Valkyrie": 8, "Golem": 30, "Witch": 12, "Lava Hound": 30,
  "Bowler": 6, "Ice Golem": 15, "Headhunter": 6, "Apprentice Warden": 20, "Druid": 16,
  "Furnace": 18, "Ruin Witch": 8, // custom

  // Super Troops
  "Super Barbarian": 5, "Super Archer": 12, "Super Giant": 10, "Sneaky Goblin": 3, "Super Wall Breaker": 8,
  "Rocket Balloon": 8, "Super Wizard": 10, "Super Dragon": 40, "Inferno Dragon": 15, "Super Minion": 12,
  "Super Valkyrie": 20, "Super Witch": 40, "Ice Hound": 40, "Super Bowler": 30, "Super Miner": 24,
  "Super Hog Rider": 12, "Super Yeti": 35
};

export const SPELL_HOUSING_SPACE: Record<string, number> = {
  "Lightning Spell": 1, "Healing Spell": 2, "Rage Spell": 2, "Jump Spell": 2,
  "Freeze Spell": 1, "Clone Spell": 3, "Invisibility Spell": 1, "Recall Spell": 2, "Revive Spell": 2,
  "Poison Spell": 1, "Earthquake Spell": 1, "Haste Spell": 1, "Skeleton Spell": 1,
  "Bat Spell": 1, "Overgrowth Spell": 2, "Totem Spell": 1, "Ice Block Spell": 1
};

export interface THCapacity {
  camp: number;
  spell: number;
  cc: number;
  ccSpell: number;
}

// Map TH level to capacities
export const TH_CAPACITIES: Record<number, THCapacity> = {
  1: { camp: 20, spell: 0, cc: 0, ccSpell: 0 },
  2: { camp: 30, spell: 0, cc: 10, ccSpell: 0 },
  3: { camp: 70, spell: 0, cc: 10, ccSpell: 0 },
  4: { camp: 80, spell: 0, cc: 15, ccSpell: 0 },
  5: { camp: 135, spell: 1, cc: 15, ccSpell: 0 },
  6: { camp: 150, spell: 2, cc: 20, ccSpell: 0 },
  7: { camp: 200, spell: 6, cc: 20, ccSpell: 0 },
  8: { camp: 200, spell: 7, cc: 25, ccSpell: 1 },
  9: { camp: 220, spell: 9, cc: 30, ccSpell: 1 },
  10: { camp: 240, spell: 11, cc: 35, ccSpell: 1 },
  11: { camp: 260, spell: 11, cc: 35, ccSpell: 2 },
  12: { camp: 280, spell: 11, cc: 40, ccSpell: 2 },
  13: { camp: 300, spell: 11, cc: 45, ccSpell: 2 },
  14: { camp: 300, spell: 11, cc: 50, ccSpell: 2 },
  15: { camp: 320, spell: 11, cc: 50, ccSpell: 3 },
  16: { camp: 320, spell: 11, cc: 50, ccSpell: 3 },
  17: { camp: 340, spell: 13, cc: 55, ccSpell: 3 },
  18: { camp: 360, spell: 15, cc: 60, ccSpell: 3 }
};

export interface HeroData {
  name: string;
  equipments: string[];
}

export const HEROES: HeroData[] = [
  { name: "Barbarian King", equipments: ["Barbarian Puppet", "Rage Vial", "Earthquake Boots", "Vampstache", "Giant Gauntlet", "Spiky Ball", "Snake Bracelet"] },
  { name: "Archer Queen", equipments: ["Archer Puppet", "Invisibility Vial", "Giant Arrow", "Healer Puppet", "Frozen Arrow", "Magic Mirror", "Action Figure", "Monolith Arrow"] },
  { name: "Grand Warden", equipments: ["Eternal Tome", "Life Gem", "Rage Gem", "Healing Tome", "Fireball", "Heroic Torch", "LavaLoon Puppet"] },
  { name: "Royal Champion", equipments: ["Royal Gem", "Seeking Shield", "Haste Vial", "Hog Rider Puppet", "Rocket Spear", "Electro Boots"] },
  { name: "Minion Prince", equipments: ["Meteor Staff", "Dark Crown"] },
  { name: "Dragon Duke", equipments: ["Fire Heart", "Rocket Backpack"] }
];

export interface MetaArmy {
  id: string;
  name: string;
  thLevel: number;
  description: string;
  troops: { name: string; count: number }[];
  spells: { name: string; count: number }[];
  ccTroops?: { name: string; count: number }[];
  ccSpells?: { name: string; count: number }[];
  heroes?: { name: string; equipments: string[] }[];
}

export const META_ARMIES: MetaArmy[] = [
  // TH7 - 200 Camp, 6 Spell
  {
    id: "th7_dragons", name: "Mass Dragons", thLevel: 7,
    description: "The classic TH7 strategy. Zap one air defense and overwhelm the rest with Dragons.",
    troops: [{ name: "Dragon", count: 10 }],
    spells: [{ name: "Lightning Spell", count: 6 }]
  },
  // TH8 - 200 Camp, 7 Spell
  {
    id: "th8_gowipe", name: "GoWiPe", thLevel: 8,
    description: "A heavy ground smash. Golems tank, Wall Breakers open compartments, Wizards and Pekkas destroy everything.",
    troops: [{ name: "Golem", count: 2 }, { name: "P.E.K.K.A", count: 3 }, { name: "Wizard", count: 13 }, { name: "Wall Breaker", count: 6 }, { name: "Archer", count: 1 }],
    spells: [{ name: "Healing Spell", count: 1 }, { name: "Rage Spell", count: 2 }, { name: "Poison Spell", count: 1 }]
  },
  // TH9 - 220 Camp, 9 Spell
  {
    id: "th9_qc_lalo", name: "Queen Charge LaLo", thLevel: 9,
    description: "Queen Charge takes out key defenses, followed by surgical Lava Hound and Balloon deployment.",
    troops: [{ name: "Healer", count: 4 }, { name: "Lava Hound", count: 2 }, { name: "Balloon", count: 16 }, { name: "Wall Breaker", count: 5 }, { name: "Minion", count: 6 }, { name: "Archer", count: 2 }],
    spells: [{ name: "Rage Spell", count: 2 }, { name: "Haste Spell", count: 3 }, { name: "Poison Spell", count: 2 }]
  },
  // TH10 - 240 Camp, 11 Spell
  {
    id: "th10_zap_witches", name: "Zap Witches", thLevel: 10,
    description: "Zap out the Inferno Towers, then send a wall of Golems and Witches.",
    troops: [{ name: "Golem", count: 3 }, { name: "Witch", count: 12 }, { name: "Wall Breaker", count: 3 }],
    spells: [{ name: "Lightning Spell", count: 8 }, { name: "Earthquake Spell", count: 2 }, { name: "Freeze Spell", count: 1 }]
  },
  // TH11 - 260 Camp, 11 Spell
  {
    id: "th11_edrag", name: "Edrag Spam", thLevel: 11,
    description: "Simple but devastating. Chain lightning through clustered bases.",
    troops: [{ name: "Electro Dragon", count: 7 }, { name: "Balloon", count: 10 }],
    spells: [{ name: "Rage Spell", count: 3 }, { name: "Freeze Spell", count: 5 }]
  },
  {
    id: "th11_qc_hybrid", name: "QC Hybrid", thLevel: 11,
    description: "Queen Charge combined with a massive pack of Miners and Hog Riders.",
    troops: [{ name: "Healer", count: 5 }, { name: "Miner", count: 15 }, { name: "Hog Rider", count: 15 }, { name: "Wall Breaker", count: 5 }, { name: "Balloon", count: 3 }],
    spells: [{ name: "Healing Spell", count: 2 }, { name: "Rage Spell", count: 2 }, { name: "Freeze Spell", count: 2 }, { name: "Poison Spell", count: 1 }]
  },
  // TH12 - 280 Camp, 11 Spell
  {
    id: "th12_yeti_smash", name: "Yeti Smash", thLevel: 12,
    description: "Use Wardens aura with Yetis and Witches to completely overrun the base.",
    troops: [{ name: "Healer", count: 4 }, { name: "Yeti", count: 7 }, { name: "Witch", count: 6 }, { name: "Bowler", count: 3 }, { name: "Wall Breaker", count: 4 }],
    spells: [{ name: "Rage Spell", count: 2 }, { name: "Jump Spell", count: 2 }, { name: "Freeze Spell", count: 2 }, { name: "Poison Spell", count: 1 }]
  },
  {
    id: "th12_edrag", name: "Edrag Spam", thLevel: 12,
    description: "Bigger army camps mean more loons to support the Edrags.",
    troops: [{ name: "Electro Dragon", count: 8 }, { name: "Balloon", count: 8 }],
    spells: [{ name: "Rage Spell", count: 3 }, { name: "Freeze Spell", count: 5 }]
  },
  // TH13 - 300 Camp, 11 Spell
  {
    id: "th13_qc_hybrid", name: "QC Hybrid", thLevel: 13,
    description: "The Hybrid shines at TH13 against the Scattershots.",
    troops: [{ name: "Healer", count: 5 }, { name: "Miner", count: 18 }, { name: "Hog Rider", count: 17 }, { name: "Wall Breaker", count: 7 }, { name: "Balloon", count: 4 }, { name: "Archer", count: 3 }],
    spells: [{ name: "Healing Spell", count: 2 }, { name: "Rage Spell", count: 2 }, { name: "Freeze Spell", count: 2 }, { name: "Poison Spell", count: 1 }]
  },
  // TH14 - 300 Camp, 11 Spell
  {
    id: "th14_super_bowler", name: "Super Bowler Smash", thLevel: 14,
    description: "Keep Super Bowlers alive with Healers and Rage spells to bounce rocks through the core.",
    troops: [{ name: "Healer", count: 4 }, { name: "Super Bowler", count: 4 }, { name: "Ice Golem", count: 3 }, { name: "Witch", count: 4 }, { name: "Balloon", count: 3 }, { name: "Wall Breaker", count: 8 }],
    spells: [{ name: "Rage Spell", count: 3 }, { name: "Jump Spell", count: 1 }, { name: "Freeze Spell", count: 2 }, { name: "Poison Spell", count: 1 }]
  },
  // TH15 - 320 Camp, 11 Spell
  {
    id: "th15_zap_titans", name: "Zap Titans", thLevel: 15,
    description: "Electro Titans naturally deal with CC troops and skeletons while smashing the base.",
    troops: [{ name: "Electro Titan", count: 5 }, { name: "Healer", count: 5 }, { name: "Ice Golem", count: 2 }, { name: "Apprentice Warden", count: 1 }, { name: "Balloon", count: 4 }, { name: "Wall Breaker", count: 6 }, { name: "Minion", count: 4 }],
    spells: [{ name: "Lightning Spell", count: 6 }, { name: "Earthquake Spell", count: 1 }, { name: "Rage Spell", count: 1 }, { name: "Freeze Spell", count: 2 }]
  },
  // TH16 - 320 Camp, 11 Spell
  {
    id: "th16_root_riders", name: "Root Rider Spam", thLevel: 16,
    description: "Root Riders break walls instantly, allowing Valkyries or Druids to sweep the base.",
    troops: [{ name: "Root Rider", count: 9 }, { name: "Valkyrie", count: 9 }, { name: "Apprentice Warden", count: 1 }, { name: "Druid", count: 2 }, { name: "Balloon", count: 3 }, { name: "Archer", count: 1 }],
    spells: [{ name: "Overgrowth Spell", count: 2 }, { name: "Rage Spell", count: 2 }, { name: "Freeze Spell", count: 2 }, { name: "Poison Spell", count: 1 }],
    heroes: [
      { name: "Barbarian King", equipments: ["Giant Gauntlet", "Spiky Ball"] },
      { name: "Archer Queen", equipments: ["Action Figure", "Magic Mirror"] },
      { name: "Grand Warden", equipments: ["Eternal Tome", "Healing Tome"] },
      { name: "Royal Champion", equipments: ["Haste Vial", "Electro Boots"] }
    ]
  },
  // TH17 - 340 Camp, 13 Spell
  {
    id: "th17_root_valk", name: "Root Rider Valks", thLevel: 17,
    description: "Expanded camps allow for even more devastating Root Rider smashes.",
    troops: [{ name: "Root Rider", count: 10 }, { name: "Valkyrie", count: 8 }, { name: "Druid", count: 2 }, { name: "Apprentice Warden", count: 1 }, { name: "Balloon", count: 4 }, { name: "Minion", count: 2 }],
    spells: [{ name: "Overgrowth Spell", count: 2 }, { name: "Rage Spell", count: 3 }, { name: "Freeze Spell", count: 2 }, { name: "Poison Spell", count: 1 }]
  },
  // TH18 - 360 Camp, 15 Spell
  {
    id: "th18_mega_smash", name: "TH18 Mega Smash", thLevel: 18,
    description: "An overwhelming ground attack leveraging the massive TH18 camp space.",
    troops: [{ name: "Root Rider", count: 12 }, { name: "Electro Titan", count: 2 }, { name: "Valkyrie", count: 5 }, { name: "Druid", count: 1 }],
    spells: [{ name: "Overgrowth Spell", count: 2 }, { name: "Rage Spell", count: 4 }, { name: "Freeze Spell", count: 2 }, { name: "Poison Spell", count: 1 }],
    ccTroops: [{ name: "Root Rider", count: 2 }, { name: "Valkyrie", count: 2 }, { name: "Wall Breaker", count: 2 }],
    ccSpells: [{ name: "Rage Spell", count: 1 }, { name: "Freeze Spell", count: 1 }],
    heroes: [
      { name: "Barbarian King", equipments: ["Giant Gauntlet", "Spiky Ball"] },
      { name: "Archer Queen", equipments: ["Action Figure", "Monolith Arrow"] },
      { name: "Grand Warden", equipments: ["Eternal Tome", "Heroic Torch"] },
      { name: "Royal Champion", equipments: ["Haste Vial", "Electro Boots"] },
      { name: "Minion Prince", equipments: ["Meteor Staff", "Dark Crown"] },
      { name: "Dragon Duke", equipments: ["Fire Heart", "Rocket Backpack"] }
    ]
  }
];

export type CategoryKey = keyof typeof CLASH_DATA;
