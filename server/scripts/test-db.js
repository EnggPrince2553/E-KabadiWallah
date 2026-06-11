require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    // Add your DB test logic here – for now this file mirrors list-collections behavior.
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Database:', db.databaseName);
    console.log('Collections:');
    collections.forEach(col => console.log(' -', col.name));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
  }
})();
