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
  createNote: async ({ content }) => {
    try {
      return Note.create({ content, author: 'Vlad' });
    } catch (err) {
      console.log(err);
    }
  },
  updateNote: async ({ id, content }) => {
    try {
      return Note.findOneAndUpdate({ _id: id }, { $set: { content } }, { new: true });
    } catch (err) {
      console.log(err);
    }
  },
  deleteNote: async (id) => {
    try {
      Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};