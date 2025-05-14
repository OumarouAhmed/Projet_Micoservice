const express = require('express');
const connectDB = require('./config/db');
const runConsumer = require('./kafka/consumer');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json());

// Connexion MongoDB
connectDB();

// Lancer le consumer Kafka
runConsumer().catch(console.error);

// Routes
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('History Service is running');
});

app.listen(3004, () => {
  console.log('History Service listening on port 3004');
});
