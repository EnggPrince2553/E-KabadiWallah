const dns = require('dns');

dns.resolveSrv('_mongodb._tcp.cluster0.ebfqktr.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('DNS SRV resolution failed:', err.message);
    process.exit(1);
  }
  console.log('DNS SRV resolution succeeded:', addresses);
  process.exit(0);
});
