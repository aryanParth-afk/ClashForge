const fs = require('fs');

async function test() {
  const url = 'https://clashofclans.fandom.com/wiki/Special:FilePath/Avatar_Minion.png';
  console.log('Fetching', url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0 Safari/537.36',
        'Referer': 'https://clashofclans.fandom.com/'
      },
      redirect: 'follow'
    });
    console.log('Status:', res.status, res.statusText);
    const contentType = res.headers.get('content-type');
    console.log('Content-Type:', contentType);
    if (res.ok) {
        const buffer = await res.arrayBuffer();
        console.log('Size:', buffer.byteLength);
    }
  } catch(e) {
    console.error(e);
  }
}
test();
