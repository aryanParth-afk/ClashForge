const https = require('https');
const url = 'https://raw.githubusercontent.com/Statscell/clash-of-clans-csv/master/logic/buildings.csv';

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const lines = data.split('\n');
        const names = [];
        for (let i = 2; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;
            // The first column is "Name"
            const match = line.match(/^"([^"]+)"/);
            if (match && match[1]) {
                names.push(match[1]);
            }
        }
        // indices 0, 1, 2... map to 1000000, 1000001, etc.
        const idsToFind = [33, 38, 39, 44, 45, 46, 70];
        for (const id of idsToFind) {
            console.log(`1000${id.toString().padStart(3, '0')}: ${names[id]}`);
        }
    });
}).on('error', console.error);
