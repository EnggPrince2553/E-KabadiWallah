const Pickup = require('../models/Pickup');

const createPickup = async (req, res) => {
    try {
        const { scrapType, weight, address, scheduledDate, price } = req.body;
        const pickup = await Pickup.create({
            userId: req.user._id,
            scrapType,
            weight,
            address,
            scheduledDate,
            price,
            image: req.file ? `/uploads/${req.file.filename}` : ''
        });
        console.log(`Pickup Created in DB: ${pickup.collection.name}`);
        console.log(`Pickup ID: ${pickup._id}`);
        res.status(201).json({
            success: true,
            message: 'Pickup scheduled successfully',
            data: pickup
        });
    } catch (error) {
        console.error("Create Pickup Error:", error);
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const getMyPickups = async (req, res) => {
    try {
        const pickups = await Pickup.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({
            success: true,
            message: 'Pickups fetched successfully',
            data: pickups
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

module.exports = { createPickup, getMyPickups };
