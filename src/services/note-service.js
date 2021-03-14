const mongoose = require('mongoose');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');

const { DB_NOTES_LIMIT, DB_NOTES_FEED_LIMIT } = require('../constants');

const Note = require('../models/note');

module.exports = {
  getNotes: async () => {
    try {
      return Note.find().limit(DB_NOTES_LIMIT);
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
  createNote: async ({ content, private: p, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a note');
    }

    try {
      return Note.create({ 
        content,
        author: mongoose.Types.ObjectId(user.id),
        private: p,
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateNote: async ({ id, content, private: p, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a note');
    }

    try {
      const note = await Note.findById(id);

      if (note && String(note.author) !== user.id) {
        throw new ForbiddenError('You don\'t have permission to update this note');
      }

      return await Note.findByIdAndUpdate(
        { _id: id },
        { $set: { content, private: p } },
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
  toggleFavorite: async ({ id, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to toggle a note');
    }

    try {
      const note = await Note.findById(id);
      const hasUser = note.favoritedBy.indexOf(user.id);

      if (hasUser >= 0) {
        return await Note.findByIdAndUpdate(
          id,
          {
            $pull: {
              favoritedBy: mongoose.Types.ObjectId(user.id)
            },
            $inc: {
              favoriteCount: -1
            }
          },
          {
            new: true,
          }
        );
      } else {
        return await Note.findByIdAndUpdate(
          id,
          {
            $push: {
              favoritedBy: mongoose.Types.ObjectId(user.id)
            },
            $inc: {
              favoriteCount: 1
            }
          },
          {
            new: true
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
  togglePrivacy: async ({ id, private: p, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to toggle a note');
    }

    try {
      const note = await Note.findById(id);
      
      if (note && String(note.author) !== user.id) {
        throw new ForbiddenError('You don\'t have permission to update this note');
      }

      return await Note.findByIdAndUpdate(
        { _id: id },
        { $set: { private: p } },
        { new: true },
      );
    } catch (err) {
      console.log(err);
    }
  },
  getNotesByUserId: async ({ id }) => {
    return await Note.find({ author: id }).sort({ _id: -1 });
  },
  geFavoritesNotesByUserID: async ({ id }) => {
    return await Note.find({ favoritedBy: id }).sort({ _id: -1 });
  },
  getNotesFeed: async ({ cursor, user }) => {
    let hasNextPage = false;

    let findQuery = {};

    if (cursor) {
      findQuery = { _id: { $lt: cursor } };
    }

    let notes = await Note.find(findQuery)
      .sort({ _id: 1 })
      .limit(DB_NOTES_FEED_LIMIT + 1);

    if (notes.length > DB_NOTES_FEED_LIMIT) {
      hasNextPage = true;
      notes = notes.slice(0, -1);
    }

    const newCursor = notes[notes.length - 1]._id;

    notes = notes.filter((note) => {
      if (user && String(note.author) === user.id) {
        return true;
      }
  
      return !note.private;
    });

    return {
      notes,
      hasNextPage,
      cursor: newCursor,
    };
  },
  getTrendsNotes: async () => {
    return await Note.find({ private: false }).sort({ favoriteCount: -1 }).limit(DB_NOTES_LIMIT);
  },
  searchNotes: async ({ text, user }) => {    
    const matchesPublicNotes = await Note.find({ private: false, content: { $regex: text, $options: 'i' } }).limit(DB_NOTES_LIMIT);

    if (!user) {
      return matchesPublicNotes;
    }

    const matchesPrivateNotes = await Note.find({ author: user.id, private: true, content: { $regex: text, $options: 'i' } }).limit(DB_NOTES_LIMIT);

    return [...matchesPublicNotes, ...matchesPrivateNotes];
  },
};