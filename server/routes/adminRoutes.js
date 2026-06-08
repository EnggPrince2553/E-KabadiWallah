const express = require('express');
const router = express.Router();
const { getAllPickups, updatePickupStatus } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/pickups', protect, admin, getAllPickups);
router.put('/pickups/:id/status', protect, admin, updatePickupStatus);

module.exports = router;
