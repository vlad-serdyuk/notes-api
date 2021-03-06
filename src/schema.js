const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

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

  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
    createdAt: DateTime!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    noteId: String!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
  }

  union Entity = Note | Comment | User
`;