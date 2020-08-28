const mongoose = require('mongoose');

const horseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  naam: { type: String, required: true },
  geboortejaar: { type: String, required: true },
  geslacht: { type: String, required: true },
  vader: { type: String, required: true },
  moeder: { type: String,  required: true },
  vaderVader: { type: String, required: true },
  vaderMoeder: { type: String, required: true },
  moederVader: { type: String, required: true },
  moederMoeder: { type: String, required: true },
  ras: { type: String, required: true },
  youtubeLinks: { type: Array, required: false },
  fotoPad : { type: String, required: true }
});	

module.exports = mongoose.model('Horse', horseSchema); 