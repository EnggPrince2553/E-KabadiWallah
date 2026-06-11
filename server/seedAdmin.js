require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scrapdb';
        await mongoose.connect(mongoUri);
        const adminExists = await User.findOne({ email: 'prince24080@gmail.com' });
        if (adminExists) {
            console.log('Admin already exists');
        } else {
            await User.create({
                name: 'Prince',
                email: 'prince24080@gmail.com',
                password: 'prince2553',
                role: 'admin'
            });
            console.log('✅ Admin user created successfully.');
            console.log('Email: prince24080@gmail.com');
            console.log('Password: prince2553');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
