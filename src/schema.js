const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
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
  }

  type Query {
    note(id: ID!): Note!
    notes: [Note!]!
    notesFeed(cursor: String): NoteFeed
    me: User
    user(username: String!): User!
    users: [User!]!
    signOut: Boolean!
  }

  type Mutation {
    createNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    toggleFavorite(id: ID!): Note!

    updateUser(username: String!): User!

    signUp(username: String!, email: String!, password: String!): Boolean!
    signIn(email: String!, password: String!): Boolean!
  }
`;