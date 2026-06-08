const express = require('express');
const router = express.Router();
const { createPickup, getMyPickups } = require('../controllers/pickupController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/create', protect, upload.single('image'), createPickup);
router.get('/my', protect, getMyPickups);

module.exports = router;
