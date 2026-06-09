const mongoose = require('mongoose');

const ScrapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  weightKg: { type: Number, required: true },
  collectedAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Scrap', ScrapSchema);
