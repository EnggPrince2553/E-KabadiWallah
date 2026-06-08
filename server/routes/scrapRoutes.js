const express = require('express');
const router = express.Router();
const { getScrapPrices, seedScrapPrices } = require('../controllers/scrapController');

router.get('/prices', getScrapPrices);
router.post('/seed', seedScrapPrices); // extra route to seed

module.exports = router;
