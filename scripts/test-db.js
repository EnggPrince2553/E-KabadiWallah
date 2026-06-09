require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const TestSchema = new mongoose.Schema({ message: String, createdAt: { type: Date, default: Date.now } });
    const Test = mongoose.model('Test', TestSchema);
    return Test.create({ message: 'Hello from Antigravity test' });
  })
  .then(doc => {
    console.log('📄 Inserted test document:', doc);
  })
  .catch(err => {
    console.error('❌ Error:', err);
  })
  .finally(() => {
    mongoose.disconnect();
  });
