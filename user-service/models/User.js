const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  solde: { type: Number, required: true, default: 0 },
  banque: { type: String, required: true } // ex: "BIMR", "Attijari"
});

module.exports = mongoose.model('User', userSchema);
