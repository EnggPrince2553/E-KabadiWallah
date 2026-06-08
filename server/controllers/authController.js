const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists', data: null });
        }
        const user = await User.create({ name, email, password, role });
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        console.error("Register Error: ", error);
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    totalEarnings: user.totalEarnings,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password', data: null });
        }
    } catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const clerkSync = async (req, res) => {
    try {
        const { clerkId, email, name, profileImage } = req.body;
        const clerkAuth = req.auth; 
        
        if (!clerkAuth || clerkAuth.userId !== clerkId) {
            return res.status(401).json({ success: false, message: 'Invalid or missing Clerk token', data: null });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.findOne({ clerkId });
        }

        if (user) {
            user.clerkId = clerkId;
            if (!user.profileImage && profileImage) {
                 user.profileImage = profileImage;
            }
            await user.save();
        } else {
            user = await User.create({
                name,
                email,
                clerkId,
                profileImage,
                password: Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10)
            });
        }

        res.json({
            success: true,
            message: 'Clerk login successful',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                totalEarnings: user.totalEarnings,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                success: true,
                message: 'User profile fetched',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    totalEarnings: user.totalEarnings,
                    profileImage: user.profileImage
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found', data: null });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.json({ success: true, message: 'Email verified', data: null });
        } else {
            res.status(404).json({ success: false, message: 'User with this email not found', data: null });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found', data: null });
        }

        user.password = newPassword;
        await user.save();

        res.json({ success: true, message: 'Password reset successfully', data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

module.exports = { registerUser, loginUser, clerkSync, getUserProfile, verifyEmail, resetPassword };
