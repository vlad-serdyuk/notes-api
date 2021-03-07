const { gql } = require('apollo-server-express');

module.exports = gql`
  type Comment {
    id: ID!
    noteId: String!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
  }
`;