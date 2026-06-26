import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  
  if (!name) {
    return new NextResponse('Missing name', { status: 400 });
  }

  // Common Fandom format
  const formatted = name.replace(/ /g, '_');
  const targetUrl = `https://clashofclans.fandom.com/wiki/Special:FilePath/${formatted}.png`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0 Safari/537.36',
        'Referer': 'https://clashofclans.fandom.com/'
      },
      redirect: 'follow'
    });

    if (!res.ok) {
        // Some troops might use _info.png
        const fallbackUrl = `https://clashofclans.fandom.com/wiki/Special:FilePath/${formatted}_info.png`;
        const res2 = await fetch(fallbackUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0 Safari/537.36',
              'Referer': 'https://clashofclans.fandom.com/'
            },
            redirect: 'follow'
        });

        if (!res2.ok) {
            return new NextResponse('Image not found', { status: 404 });
        }
        
        const buffer = await res2.arrayBuffer();
        return new NextResponse(buffer, {
            headers: {
              'Content-Type': res2.headers.get('Content-Type') || 'image/png',
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    }

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
