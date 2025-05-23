const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderBIC: { type: String, required: true },
  receiverBIC: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);

