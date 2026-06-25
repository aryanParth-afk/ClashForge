import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const url = 'https://raw.githubusercontent.com/Statscell/clash-of-clans-csv/master/logic/buildings.csv';
  try {
    const res = await fetch(url);
    const data = await res.text();
    fs.writeFileSync(path.join(process.cwd(), 'public', 'buildings.csv'), data);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
