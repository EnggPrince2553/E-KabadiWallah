const Pickup = require('../models/Pickup');

const getAllPickups = async (req, res) => {
    try {
        const pickups = await Pickup.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json({ success: true, message: 'All pickups fetched', data: pickups });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const updatePickupStatus = async (req, res) => {
    try {
        const { status, weight, price } = req.body;
        const pickup = await Pickup.findById(req.params.id);
        
        if (pickup) {
            // Update fields if provided
            if (status) pickup.status = status;
            if (weight) pickup.weight = weight;
            if (price) pickup.price = price;
            
            const updatedPickup = await pickup.save();

            // Recalculate total earnings for the user
            const User = require('../models/User');
            const user = await User.findById(pickup.userId);
            if (user) {
                // Find all completed pickups for this user
                const completedPickups = await Pickup.find({
                    userId: pickup.userId,
                    status: 'completed'
                });
                
                // Sum prices of all completed pickups
                const newTotalEarnings = completedPickups.reduce((sum, p) => sum + (p.price || 0), 0);
                
                // Update user's totalEarnings
                user.totalEarnings = newTotalEarnings;
                await user.save();
            }
            
            res.json({ success: true, message: `Pickup updated and earnings recalculated`, data: updatedPickup });
        } else {
            res.status(404).json({ success: false, message: 'Pickup not found', data: null });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

module.exports = { getAllPickups, updatePickupStatus };
