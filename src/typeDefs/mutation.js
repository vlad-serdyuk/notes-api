const { gql } = require('apollo-server-express');

module.exports = gql`
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
    toggleFavoriteComment(id: ID!): Comment!

    signUp(username: String!, email: String!, password: String!): Boolean!
    signIn(email: String!, password: String!): Boolean!
  }
`;