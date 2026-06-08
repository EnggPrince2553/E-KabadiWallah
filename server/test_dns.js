const dns = require('dns');

const cluster = 'cluster0.vvgcp5r.mongodb.net';
const srv = `_mongodb._tcp.${cluster}`;

console.log(`Resolving SRV record for: ${srv}`);

dns.resolveSrv(srv, (err, addresses) => {
  if (err) {
    console.error('DNS SRV resolution failed:', err.message);
    
    console.log(`Resolving A record for: ${cluster}`);
    dns.resolve4(cluster, (err2, addresses2) => {
      if (err2) {
        console.error('DNS A record resolution failed:', err2.message);
        process.exit(1);
      }
      console.log('DNS A record resolution succeeded:', addresses2);
      process.exit(0);
    });
    return;
  }
  console.log('DNS SRV resolution succeeded:', addresses);
  process.exit(0);
});
