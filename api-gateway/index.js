const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');
const restRoutes = require('./routes/restRoutes');

const app = express();
app.use(express.json());

// Routes REST
app.use('/api', restRoutes);

// ✅ Lance le serveur GraphQL + Express ensemble
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(3000, () => {
    console.log("✅ API Gateway listening on port 3000");
    console.log(`🚀 GraphQL ready at http://localhost:3000${server.graphqlPath}`);
  });
}

startServer();
