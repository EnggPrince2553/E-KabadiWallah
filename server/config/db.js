const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scrapdb';
        if (!process.env.MONGODB_URI && !process.env.MONGO_URI) {
            console.warn('MONGODB_URI / MONGO_URI not set, falling back to local MongoDB at mongodb://127.0.0.1:27017/scrapdb');
        }
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
