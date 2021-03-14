import http from 'http';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const db = require('./db');
const config = require('./config');
const typeDefs = require('./schema');
const { Query, Mutation, Note, User, Comment } = require('./typeDefs');
const resolvers = require('./resolvers');
const sessionMiddleware = require('./middlewares/Session');
const { GRAPHQL_DEPTH_LIMIT, GRAPGQL_COPLEXITY_LIMIT_RULE } = require('./constants');
const UserService = require('./services/user-service');

db.connect(config.dbHost);

const corsOptions = {
  origin: config.originUrl,
  credentials: true,
};

const app = express();

app.use(helmet());
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(sessionMiddleware);

const server = new ApolloServer({ 
  typeDefs: [Query, Mutation, Note, User, Comment, typeDefs],
  resolvers,
  cors: false,
  validationRules: [
    depthLimit(GRAPHQL_DEPTH_LIMIT),
    createComplexityLimitRule(GRAPGQL_COPLEXITY_LIMIT_RULE),
  ],
  subscriptions: {
    path: '/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
      // TODO: add logging
      console.log('Client connected');
    },
    onDisconnect: (webSocket, context) => {
      // TODO: add logging
      console.log('Client disconnected')
    },
  },
  context: async ({ req }) => {
    const token = req.session.getToken();    
    const user = UserService.getUser(token);

    return { user, meta: { session: req.session } };
  },
});

server.applyMiddleware({ app, path: '/api', cors: false });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.get('/', (req, res) => res.send('Notedly-api'));

app.listen(config.port, () => {
  httpServer.listen({ port: 8000 }, () => {
    console.log('Apollo Server ws running on ws://localhost:8000/subscriptions');
  });
  console.log(`Server running at ${config.port}`)
});
