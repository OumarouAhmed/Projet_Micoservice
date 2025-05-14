const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Chargement du fichier .proto avec options recommandées
const packageDef = protoLoader.loadSync(
  path.join(__dirname, 'proto', 'settlement.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

// Charger le package gRPC généré depuis .proto
const grpcObject = grpc.loadPackageDefinition(packageDef);

// Ici on accède au package défini dans le fichier .proto
const settlementPackage = grpcObject.settlement;

// Création du serveur
const server = new grpc.Server();

// Implémentation de la méthode Transfer
server.addService(settlementPackage.SettlementService.service, {
  Transfer: (call, callback) => {
    const { senderBIC, receiverBIC, amount } = call.request;
    console.log("📨 Reçu :", { senderBIC, receiverBIC, amount });

    // Réponse simulée (remplace ça par ta vraie logique métier plus tard)
    const result = {
      success: true,
      message: `Transfert de ${amount} MRU de ${senderBIC} vers ${receiverBIC} effectué avec succès.`
    };

    callback(null, result);
  }
});

// Démarrage du serveur sur le port 50051
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error("❌ Erreur lors du démarrage du serveur :", err.message);
    return;
  }

  console.log(`✅ Settlement Service gRPC listening on port ${port}`);
  server.start();
});
