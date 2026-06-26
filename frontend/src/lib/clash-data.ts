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
  ]
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
  "Phoenix": "Rises from the ashes to revive its Hero with a burst of invulnerability."
};

export type CategoryKey = keyof typeof CLASH_DATA;
