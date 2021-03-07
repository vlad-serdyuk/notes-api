const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Subscription {
    notesFeedUpdated: Note!
  }

  union Entity = Note | Comment | User
`;