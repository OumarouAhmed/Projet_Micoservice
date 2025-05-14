const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Créer un utilisateur
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Liste des utilisateurs
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Détail d’un utilisateur
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.json(user);
});

module.exports = router;
