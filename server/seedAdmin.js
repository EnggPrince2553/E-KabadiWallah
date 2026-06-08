require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const adminExists = await User.findOne({ email: 'admin@kabadiwala.com' });
        if (adminExists) {
            console.log('Admin already exists');
        } else {
            await User.create({
                name: 'System Admin',
                email: 'admin@kabadiwala.com',
                password: 'password123',
                role: 'admin'
            });
            console.log('✅ Admin user created successfully.');
            console.log('Email: admin@kabadiwala.com');
            console.log('Password: password123');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
