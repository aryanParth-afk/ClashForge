import urllib.request
import json

url = "https://api.github.com/repos/Statscell/clash-assets/git/trees/main?recursive=1"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        paths = [t['path'] for t in data['tree'] if 'Cannon' in t['path'] or 'Archer' in t['path']]
        print(paths[:20])
except Exception as e:
    print(e)
