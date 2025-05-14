const express = require('express');
const axios = require('axios');
const router = express.Router();

// 🔹 USERS
router.get('/users', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/api/users');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3001/api/users', req.body);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 BANKS
router.get('/banks', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3002/api/banks');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/banks', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3002/api/banks', req.body);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
