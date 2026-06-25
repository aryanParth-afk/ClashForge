import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  if (!tag) {
    return NextResponse.json({ error: 'Player tag is required' }, { status: 400 });
  }

  // Normalize tag (remove leading # and uppercase)
  const cleanTag = tag.replace(/^#/, '').toUpperCase();
  const encodedTag = `%23${cleanTag}`;

  const token = (process.env.COC_API_TOKEN || "").trim();
  if (!token) {
    return NextResponse.json({ error: 'COC_API_TOKEN is not configured' }, { status: 500 });
  }

  try {
    const url = `https://cocproxy.royaleapi.dev/v1/players/${encodedTag}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      next: { revalidate: 60 } // Cache for 1 minute
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || `API Error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
