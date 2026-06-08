const mongoose = require('mongoose');

const scrapPriceSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true },
    pricePerKg: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ScrapPrice', scrapPriceSchema);
