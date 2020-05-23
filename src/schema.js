const { gql } = require('apollo-server-express');

module.exports = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    note(id: ID!): Note!
    notes: [Note!]!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;