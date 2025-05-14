const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Obtenir toutes les transactions
router.get('/', async (req, res) => {
  const txs = await Transaction.find().sort({ date: -1 });
  res.json(txs);
});

// Obtenir les transactions d'une banque
router.get('/:bic', async (req, res) => {
  const bic = req.params.bic;
  const txs = await Transaction.find({
    $or: [{ senderBIC: bic }, { receiverBIC: bic }]
  }).sort({ date: -1 });
  res.json(txs);
});

module.exports = router;
