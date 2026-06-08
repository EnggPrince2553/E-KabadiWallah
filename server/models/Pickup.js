const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scrapType: { type: String, required: true },
    weight: { type: Number, required: true },
    address: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'confirmed', 'rejected', 'completed'], default: 'pending' },
    price: { type: Number, required: true },
    image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Pickup', pickupSchema);
