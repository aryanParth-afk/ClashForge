const https = require('https');
const fs = require('fs');
const url = 'https://raw.githubusercontent.com/clash-of-clans-csv/clash-of-clans-csv/master/logic/buildings.csv';

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('buildings.csv', data);
        console.log('done');
    });
}).on('error', console.error);
