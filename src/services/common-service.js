const mongoose = require('mongoose');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');

const NoteService = require('./note-service');

module.exports = {
  search: async({ text, user }) => {
    const notes = await NoteService.searchNotes({ text, user });


    return notes;
  },
};