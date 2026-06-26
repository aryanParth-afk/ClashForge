import hashlib
import urllib.request

filename = "Root_Rider.png"
filename = filename.replace(' ', '_')

m = hashlib.md5()
m.update(filename.encode('utf-8'))
h = m.hexdigest()

folder1 = h[0]
folder2 = h[0:2]

url = f"https://static.wikia.nocookie.net/clashofclans/images/{folder1}/{folder2}/{filename}"

print("URL:", url)

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print("Success! Content-Type:", response.getheader('Content-Type'))
except Exception as e:
    print("Error:", e)
