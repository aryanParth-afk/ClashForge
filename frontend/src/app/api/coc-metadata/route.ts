import { NextResponse } from 'next/server';

const BASE_URL = 'https://raw.githubusercontent.com/Statscell/clash-of-clans-csv/master/logic';
const TEXTS_URL = 'https://raw.githubusercontent.com/Statscell/clash-of-clans-csv/master/localization/texts.csv';

async function fetchTexts(): Promise<Record<string, string>> {
  try {
    const res = await fetch(TEXTS_URL, { next: { revalidate: 86400 } });
    if (!res.ok) return {};
    const data = await res.text();
    const lines = data.split('\n');
    const textsMap: Record<string, string> = {};
    
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        // texts.csv format is usually: "TID_BUILDING_HOUSING","Army Camp",...
        const match = line.match(/^"([^"]+)",\s*"([^"]+)"/);
        if (match && match[1] && match[2]) {
            textsMap[match[1]] = match[2];
        }
    }
    return textsMap;
  } catch (err) {
    console.error("Failed to fetch texts.csv", err);
    return {};
  }
}

function parseCSVRow(line: string) {
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
            inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
            parts.push(current);
            current = '';
        } else {
            current += line[i];
        }
    }
    parts.push(current);
    return parts;
}

async function fetchAndParseCSV(filename: string, startId: number, textsMap: Record<string, string>) {
  try {
    const res = await fetch(`${BASE_URL}/${filename}`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch ${filename}: ${res.status}`);
      return {};
    }
    
    const data = await res.text();
    const lines = data.split('\n');
    
    let villageTypeIndex = -1;
    let tidIndex = -1;
    if (lines.length > 0) {
        const headers = parseCSVRow(lines[0]);
        villageTypeIndex = headers.indexOf('VillageType');
        tidIndex = headers.indexOf('TID');
    }
    
    const mapping: Record<number, { name: string, village: 'home' | 'builder' }> = {};
    
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        const parts = parseCSVRow(line);
        const internalName = parts[0];
        
        if (internalName && internalName !== "String" && internalName !== "Name") {
            const tid = tidIndex !== -1 ? parts[tidIndex] : parts[2];
            const cleanName = textsMap[tid] || internalName;
            
            let village: 'home' | 'builder' = 'home';
            if (villageTypeIndex !== -1 && parts[villageTypeIndex] === '1') {
                village = 'builder';
            }
            if (cleanName.includes("Master Builder") || cleanName.includes("O.T.T.O") || cleanName.includes("B.O.B")) {
                village = 'builder';
            }
            
            // In Supercell CSVs, the ID is strictly determined by its physical row index
            const actualId = startId + (i - 2);
            mapping[actualId] = { name: cleanName, village };
        }
    }
    return mapping;
  } catch (err) {
    console.error(`Error fetching ${filename}:`, err);
    return {};
  }
}

export async function GET() {
  try {
    const textsMap = await fetchTexts();
    
    // Fetch all mappings in parallel
    const [buildings, troops, spells, heroes] = await Promise.all([
      fetchAndParseCSV('buildings.csv', 1000000, textsMap),
      fetchAndParseCSV('characters.csv', 4000000, textsMap),
      fetchAndParseCSV('spells.csv', 26000000, textsMap),
      fetchAndParseCSV('heroes.csv', 28000000, textsMap)
    ]);

    const combined = {
      buildings,
      troops,
      spells,
      heroes
    };

    return NextResponse.json(combined, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
