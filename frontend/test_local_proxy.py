import urllib.request

try:
    req = urllib.request.Request("http://localhost:3000/api/image-proxy?name=Cannon")
    with urllib.request.urlopen(req) as res:
        print("Cannon status:", res.status)
        print("Content-Type:", res.getheader('Content-Type'))
except Exception as e:
    print("Cannon Error:", e)

try:
    req = urllib.request.Request("http://localhost:3000/api/image-proxy?name=Archer%20Tower")
    with urllib.request.urlopen(req) as res:
        print("Archer Tower status:", res.status)
        print("Content-Type:", res.getheader('Content-Type'))
except Exception as e:
    print("Archer Tower Error:", e)
