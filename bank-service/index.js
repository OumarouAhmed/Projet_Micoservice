const express = require('express');
const app = express();

// ❗ IMPORT DE LA CONNEXION À MONGODB
require('./config/db'); // 👈 essentiel

const bankRoutes = require('./routes/bankRoutes');

app.use(express.json());

// ✅ Monte les routes ici
app.use('/api/banks', bankRoutes);

app.listen(3002, () => {
  console.log('✅ Bank service listening on port 3002');
});
