const User = require('../models/User');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json({
                success: true,
                message: 'User profile fetched successfully',
                data: user
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found', data: null });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.file) {
                user.profileImage = `/uploads/${req.file.filename}`;
            }
            
            const updatedUser = await user.save();
            res.json({
                success: true,
                message: 'Profile updated successfully',
                data: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    profileImage: updatedUser.profileImage
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found', data: null });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

module.exports = { getUserProfile, updateUserProfile };
