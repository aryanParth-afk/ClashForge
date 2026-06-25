const fs = require('fs');

async function run() {
  try {
    const res = await fetch("http://localhost:3000/api/player?tag=%232PP");
    if (!res.ok) {
        console.error("HTTP error!", res.status, await res.text());
        return;
    }
    const data = await res.json();
    
    // Build sets of names
    const heroes = new Set();
    const troops = new Set();
    const spells = new Set();
    const equipment = new Set();
    
    for (const item of (data.heroes || [])) {
        heroes.add(item.name);
        for (const eq of (item.equipment || [])) {
            equipment.add(eq.name);
        }
    }
    for (const item of (data.troops || [])) {
        troops.add(item.name);
    }
    for (const item of (data.spells || [])) {
        spells.add(item.name);
    }
    
    const out = {
        heroes: Array.from(heroes),
        troops: Array.from(troops),
        spells: Array.from(spells),
        equipment: Array.from(equipment)
    };
    
    fs.writeFileSync("scratch_dump.json", JSON.stringify(out, null, 2));
    console.log("Done");
  } catch (err) {
    console.error(err);
  }
}

run();
