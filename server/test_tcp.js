const net = require('net');

const client = new net.Socket();
client.setTimeout(5000);

console.log('Connecting to cluster0-shard-00-00.ebfqktr.mongodb.net on port 27017...');

client.connect(27017, 'cluster0-shard-00-00.ebfqktr.mongodb.net', function() {
    console.log('TCP CONNECTION SUCCESSFUL! Port 27017 is open from your computer.');
    client.destroy();
    process.exit(0);
});

client.on('error', function(err) {
    console.log('TCP CONNECTION FAILED: ' + err.message);
    client.destroy();
    process.exit(1);
});

client.on('timeout', function() {
    console.log('TCP CONNECTION TIMED OUT! Port 27017 is blocked by your ISP or Router.');
    client.destroy();
    process.exit(1);
});
