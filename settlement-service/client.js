const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Charger le fichier proto
const packageDef = protoLoader.loadSync(
  path.join(__dirname, 'proto', 'settlement.proto'), // chemin absolu
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

// Charger l'objet gRPC
const grpcObject = grpc.loadPackageDefinition(packageDef);

// 👉 Ici on accède à `settlement.SettlementService`
const settlementPackage = grpcObject.settlement;

const client = new settlementPackage.SettlementService(
  '127.0.0.1:50051', // évite les erreurs liées à localhost IPv6
  grpc.credentials.createInsecure()
);

// Appeler la méthode Transfer
client.Transfer(
  {
    senderBIC: "BMCI123",
    receiverBIC: "BIMR456",
    amount: 1000
  },
  (err, response) => {
    if (err) {
      console.error("❌ Erreur de connexion ou exécution :", err.message);
    } else {
      console.log("✅ Réponse du service :", response);
    }
  }
);
