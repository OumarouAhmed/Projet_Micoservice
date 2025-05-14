const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bankdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connecté pour bank-service'))
.catch(err => console.error('❌ Erreur de connexion MongoDB :', err.message));

module.exports = mongoose;
