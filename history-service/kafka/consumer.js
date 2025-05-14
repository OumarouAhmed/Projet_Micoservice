const { Kafka } = require('kafkajs');
const Transaction = require('../models/Transaction');

const kafka = new Kafka({
  clientId: 'history-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'history-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'transaction_completed', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      console.log('Transaction reçue via Kafka :', data);
      const tx = new Transaction(data);
      await tx.save();
    }
  });
};

module.exports = runConsumer;
