const express = require('express');
const router = express.Router();
const Bank = require('../models/Bank');

// Ajouter une banque
router.post('/', async (req, res) => {
  try {
    const bank = new Bank(req.body);
    const saved = await bank.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lister toutes les banques
router.get('/', async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
