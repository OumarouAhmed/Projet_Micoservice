const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  bic: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  solde: { type: Number, required: true }
});

module.exports = mongoose.model('Bank', bankSchema);
