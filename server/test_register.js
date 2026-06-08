const http = require('http');

const data = JSON.stringify({
  name: 'Test User',
  email: 'test' + Math.random() + '@example.com',
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/v1/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let chunks = '';
  res.on('data', (d) => { chunks += d; });
  res.on('end', () => console.log('Response:', res.statusCode, chunks));
});

req.on('error', (error) => console.error(error));
req.write(data);
req.end();
