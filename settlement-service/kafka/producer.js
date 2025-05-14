const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'settlement-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendTransactionEvent = async (data) => {
  await producer.connect();
  await producer.send({
    topic: 'transaction_completed',
    messages: [
      { value: JSON.stringify(data) }
    ]
  });
  await producer.disconnect();
};

module.exports = sendTransactionEvent;
