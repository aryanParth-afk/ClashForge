const http = require('http');

http.get('http://localhost:3000/api/image-proxy?name=Cannon', (res) => {
  console.log(`Cannon status: ${res.statusCode}`);
  console.log(`Content-Type: ${res.headers['content-type']}`);
});

http.get('http://localhost:3000/api/image-proxy?name=Archer Tower', (res) => {
  console.log(`Archer Tower status: ${res.statusCode}`);
  console.log(`Content-Type: ${res.headers['content-type']}`);
});
