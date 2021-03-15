import http from 'http';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

import db from './db';
import config from './config';
import typeDefs from './schema';
import { Query, Mutation, Note, User, Comment } from './typeDefs';
import resolvers from './resolvers';
import sessionMiddleware from './middlewares/Session';
import { GRAPHQL_DEPTH_LIMIT, GRAPGQL_COPLEXITY_LIMIT_RULE } from './constants';
import UserService from './services/user-service';

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
