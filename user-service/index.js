const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('User Service is running');
});

app.listen(3001, () => {
  console.log('User Service listening on port 3001');
});
