const fs = require('fs');

async function test() {
  const url = 'https://clashofclans.fandom.com/wiki/Special:FilePath/Root_Rider.png';
  console.log('Fetching', url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0 Safari/537.36',
        'Referer': 'https://clashofclans.fandom.com/'
      },
      redirect: 'follow'
    });
    console.log('Status:', res.status);
    console.log('Headers:', res.headers);
    console.log('Content-Type:', res.headers.get('content-type'));
    const text = await res.text();
    console.log('Response body preview:', text.substring(0, 200));
  } catch(e) {
    console.error('Error:', e);
  }
}
test();
