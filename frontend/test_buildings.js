const crypto = require('crypto');

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://clashofclans.fandom.com/'
      },
      redirect: 'follow'
    });
    console.log(`${res.status} - ${url}`);
  } catch (e) {
    console.log(`Error - ${url}`);
  }
}

const getFandomUrl = (filename) => {
  const hash = crypto.createHash('md5').update(filename).digest('hex');
  return `https://static.wikia.nocookie.net/clashofclans/images/${hash[0]}/${hash.substring(0, 2)}/${filename}`;
};

const formats = [
  'Cannon.png',
  'Cannon_info.png',
  'Cannon1.png',
  'Cannon_1.png',
  'Cannon_Icon.png',
  'Avatar_Cannon.png',
  'Cannon_level_1.png',
  'Archer_Tower1.png',
  'Archer_Tower_info.png',
  'Mortar1.png',
  'X-Bow1.png'
];

async function run() {
  for (const f of formats) {
    await checkUrl(getFandomUrl(f));
    await checkUrl(`https://clashofclans.fandom.com/wiki/Special:FilePath/${f}`);
  }
}

run();
