const { gql } = require('apollo-server-express');
const axios = require('axios');

const typeDefs = gql`
  type User {
    _id: ID
    nom: String
    email: String
    solde: Int
    banque: String
  }

  type Bank {
    _id: ID
    bic: String
    nom: String
    solde: Int
  }

  type Transaction {
    _id: ID
    senderBIC: String
    receiverBIC: String
    amount: Int
    date: String
  }

  type Query {
    users: [User]
    banks: [Bank]
    transactions: [Transaction]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const res = await axios.get('http://localhost:3001/api/users');
      return res.data;
    },
    banks: async () => {
      const res = await axios.get('http://localhost:3002/api/banks');
      return res.data;
    },
    transactions: async () => {
      const res = await axios.get('http://localhost:3004/api/transactions');
      return res.data;
    }
  }
};

module.exports = { typeDefs, resolvers };
