const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/interbank-users', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connecté pour le User Service");
  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
