const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    note(id: ID!): Note!
    notes: [Note!]!
    notesFeed(cursor: String): NoteFeed
    trendsNotes: [Note!]
    searchNotes(text: String!): [Note]

    search(text: String!): [Entity]

    me: User
    user(usermatch: String!): User!
    users: [User!]!
    userComments(username: String!): [Comment]
    
    signOut: Boolean!
  }
`;