import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  
  if (!name) {
    return new NextResponse('Missing name', { status: 400 });
  }

  const formatted = name.replace(/ /g, '_');
  
  const getFandomUrl = (filename: string) => {
    const hash = crypto.createHash('md5').update(filename).digest('hex');
    return `https://static.wikia.nocookie.net/clashofclans/images/${hash[0]}/${hash.substring(0, 2)}/${filename}`;
  };

  const tryUrls = [
    // GitHub Repo: Statscell/clash-assets
    `https://raw.githubusercontent.com/Statscell/clash-assets/main/troops/models/${formatted}.png`,
    `https://raw.githubusercontent.com/Statscell/clash-assets/main/troops/icons/${formatted}.png`,
    `https://raw.githubusercontent.com/Statscell/clash-assets/main/troops/models/${formatted}_Spell.png`,
    `https://raw.githubusercontent.com/Statscell/clash-assets/main/troops/icons/${formatted}_Spell.png`,
    
    // Direct Fandom Static CDN (Bypasses Cloudflare)
    getFandomUrl(`Avatar_${formatted}.png`),
    getFandomUrl(`${formatted}.png`),
    getFandomUrl(`${formatted}_info.png`),
    getFandomUrl(`${formatted}_1.png`),
    
    // Original Fandom API Fallbacks
    `https://clashofclans.fandom.com/wiki/Special:FilePath/${formatted}.png`,
    `https://clashofclans.fandom.com/wiki/Special:FilePath/${formatted}_info.png`,
    `https://clashofclans.fandom.com/wiki/Special:FilePath/Avatar_${formatted}.png`
  ];

  for (const url of tryUrls) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0 Safari/537.36',
          'Referer': 'https://clashofclans.fandom.com/'
        },
        redirect: 'follow'
      });

      const contentType = res.headers.get('content-type') || '';
      
      if (res.ok && contentType.includes('image')) {
        const buffer = await res.arrayBuffer();
        return new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    } catch (e) {
      // Ignore network errors on individual URLs and continue
    }
  }

  return new NextResponse('Image not found', { status: 404 });
}
