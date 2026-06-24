import { NextResponse } from 'next/server';

export async function GET() {
  const url = 'https://raw.githubusercontent.com/Statscell/clash-of-clans-csv/master/logic/buildings.csv';
  try {
    const res = await fetch(url);
    const data = await res.text();
    const lines = data.split('\n');
    const names: string[] = [];
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        const match = line.match(/^"([^"]+)"/);
        // Only push if it has a name and is not empty string
        if (match && match[1] && match[1] !== "String" && match[1] !== "Name") {
            names.push(match[1]);
        }
    }
    const idsToFind = [33, 38, 39, 44, 45, 46, 70];
    const result: Record<string, string> = {};
    for (const id of idsToFind) {
        result[`1000${id.toString().padStart(3, '0')}`] = names[id] || "Unknown";
    }
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
