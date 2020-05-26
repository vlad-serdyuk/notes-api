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
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a note');
    }

    try {
      const note = Note.findById(id);

      if (note && String(note.author) !== user.id) {
        throw new ForbiddenError('You don\'t have permission to update this note');
      }

      return await Note.findByIdAndUpdate(
        { _id: id },
        { $set: { content } },
        { new: true },
      );
    } catch (err) {
      console.log(err);
    }
  },
  deleteNote: async ({ id, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a note');
    }

    try {
      const note = await Note.findById(id);

      if (note && String(note.author) !== user.id) {
        throw new ForbiddenError('You don\'t have permission to delete this note');
      }

      await note.remove();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};