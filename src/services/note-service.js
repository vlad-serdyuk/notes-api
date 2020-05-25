const mongoose = require('mongoose');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');

const Note = require('../models/note');

module.exports = {
  getNotes: async () => {
    try {
      return Note.find();
    } catch (err) {
      console.log(err);
    }
  },
  getNoteById: async (id) => {
    try {
      return Note.findById(id);
    } catch (err) {
      console.log(err);
    }
  },
  createNote: async ({ content, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a note');
    }

    try {
      return Note.create({ 
        content,
        author: mongoose.Types.ObjectId(user.id),
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateNote: async ({ id, content, user }) => {
    try {
      return Note.findOneAndUpdate({ _id: id }, { $set: { content } }, { new: true });
    } catch (err) {
      console.log(err);
    }
  },
  deleteNote: async ({ id, user }) => {
    try {
      Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};