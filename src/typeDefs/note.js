const { gql } = require('apollo-server-express');

module.exports = gql`
  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    private: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    comments: [Comment]
  }
`;