const ScrapPrice = require('../models/ScrapPrice');

const getScrapPrices = async (req, res) => {
    try {
        const prices = await ScrapPrice.find({});
        res.json({
            success: true,
            message: 'Scrap prices fetched successfully',
            data: prices
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

const seedScrapPrices = async (req, res) => {
    try {
        await ScrapPrice.deleteMany({});
        const samplePrices = [
            { type: 'Iron', pricePerKg: 30 },
            { type: 'Plastic', pricePerKg: 15 },
            { type: 'Paper', pricePerKg: 12 },
            { type: 'Cardboard', pricePerKg: 10 },
            { type: 'E-Waste', pricePerKg: 50 },
            { type: 'Copper', pricePerKg: 600 },
        ];
        const created = await ScrapPrice.insertMany(samplePrices);
        res.status(201).json({ success: true, message: 'Scrap prices seeded', data: created });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};

module.exports = { getScrapPrices, seedScrapPrices };
