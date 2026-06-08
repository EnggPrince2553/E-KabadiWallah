const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, upload.single('profileImage'), updateUserProfile);

module.exports = router;
