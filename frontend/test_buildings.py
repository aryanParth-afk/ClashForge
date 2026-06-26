import hashlib
import urllib.request

def get_fandom_url(filename):
    md5_hash = hashlib.md5(filename.encode('utf-8')).hexdigest()
    return f"https://static.wikia.nocookie.net/clashofclans/images/{md5_hash[0]}/{md5_hash[:2]}/{filename}"

formats = [
    'Cannon9.png',
    'Cannon_9.png',
    'Archer_Tower9.png',
    'Cannon1.png',
    'Cannon_1.png',
    'Cannon_Icon.png',
    'Avatar_Cannon.png',
    'Archer_Tower1.png',
    'Archer_Tower_info.png',
    'Mortar1.png',
    'X-Bow1.png'
]

for f in formats:
    url = get_fandom_url(f)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            print(f"200 - {url}")
    except Exception as e:
        pass
    
    special_url = f"https://clashofclans.fandom.com/wiki/Special:FilePath/{f}"
    try:
        req = urllib.request.Request(special_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            print(f"200 - {special_url}")
    except Exception as e:
        pass
