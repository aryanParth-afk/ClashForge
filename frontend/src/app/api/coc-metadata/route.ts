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

async function fetchAndParseCSV(filename: string, startId: number, textsMap: Record<string, string>): Promise<Record<number, string>> {
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
    const mapping: Record<number, string> = {};
    let currentIndex = 0;
    
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        // We only care about rows that start with a string (new item definition)
        // e.g. "Troop Housing",1,"TID_BUILDING_HOUSING"
        const match = line.match(/^"([^"]+)"\s*,[^,]*,\s*"([^"]+)"/);
        
        if (match && match[1] && match[1] !== "String" && match[1] !== "Name") {
            const internalName = match[1];
            const tid = match[2];
            
            // Map to the human-readable English text if it exists, otherwise fallback to internal name
            const cleanName = textsMap[tid] || internalName;
            
            mapping[startId + currentIndex] = cleanName;
            currentIndex++;
        } else {
            // Some CSVs might not have a TID column for every row. We still need to increment index 
            // if it's a new item (but maybe it doesn't match the regex perfectly).
            // Let's do a fallback match just for the name if the TID is missing.
            const fallbackMatch = line.match(/^"([^"]+)"/);
            if (fallbackMatch && fallbackMatch[1] && fallbackMatch[1] !== "String" && fallbackMatch[1] !== "Name") {
                // Check if we already handled this in the primary match
                if (!match) {
                    mapping[startId + currentIndex] = fallbackMatch[1];
                    currentIndex++;
                }
            }
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
