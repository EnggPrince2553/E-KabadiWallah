const express = require('express');
const router = express.Router();
const { registerUser, loginUser, clerkSync, getUserProfile, verifyEmail, resetPassword } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);

module.exports = router;
