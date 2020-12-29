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

  type Query {
    note(id: ID!): Note!
    notes: [Note!]!
    notesFeed(cursor: String): NoteFeed
    trendsNotes: [Note!]
    searchNotes(text: String!): [Note]

    me: User
    user(username: String!): User!
    users: [User!]!
    userComments(username: String!): [Comment]
    
    signOut: Boolean!
  }

  type Mutation {
    createNote(content: String!, private: Boolean!): Note!
    updateNote(id: ID!, content: String!, private: Boolean): Note!
    deleteNote(id: ID!): Boolean!
    
    toggleFavorite(id: ID!): Note!
    togglePrivacy(id: ID!, private: Boolean!): Note!

    updateUser(username: String!): User!
    resetPassword(oldPassword: String!, newPassword: String!): Boolean!

    addComment(content: String!, noteId: String!): Comment!
    deleteComment(id: ID!): Boolean!

    signUp(username: String!, email: String!, password: String!): Boolean!
    signIn(email: String!, password: String!): Boolean!
  }
`;