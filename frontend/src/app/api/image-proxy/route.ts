import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  
  if (!name) {
    return new NextResponse('Missing name', { status: 400 });
  }

  const formatted = name.replace(/ /g, '_');
  
  // Potential Fandom filenames for Clash of Clans units
  const tryUrls = [
    `https://clashofclans.fandom.com/wiki/Special:FilePath/${formatted}.png`,
    `https://clashofclans.fandom.com/wiki/Special:FilePath/${formatted}_info.png`,
    `https://clashofclans.fandom.com/wiki/Special:FilePath/Avatar_${formatted}.png`,
    `https://clashofclans.fandom.com/wiki/Special:FilePath/${formatted}_1.png`
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
      
      // Fandom sometimes returns a 200 OK generic HTML page instead of an image
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
