const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const db = require('./db');
const config = require('./config');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

db.connect(config.databaseHost);

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Notedly-api'));

app.listen(config.port, () => console.log(`Server running at ${config.port}`));
