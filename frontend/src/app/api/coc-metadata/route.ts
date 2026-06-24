import { NextResponse } from 'next/server';

const BASE_URL = 'https://raw.githubusercontent.com/Statscell/clash-of-clans-csv/master/logic';

async function fetchAndParseCSV(filename: string, startId: number): Promise<Record<number, string>> {
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
        
        // Match the first column which is "Name"
        const match = line.match(/^"([^"]+)"/);
        
        // Only increment index and map if it's a new item name row
        if (match && match[1] && match[1] !== "String" && match[1] !== "Name") {
            mapping[startId + currentIndex] = match[1];
            currentIndex++;
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
    // Fetch all mappings in parallel
    const [buildings, troops, spells, heroes] = await Promise.all([
      fetchAndParseCSV('buildings.csv', 1000000),
      fetchAndParseCSV('characters.csv', 4000000),
      fetchAndParseCSV('spells.csv', 26000000),
      fetchAndParseCSV('heroes.csv', 28000000)
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
