const mongoose = require('mongoose');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');

const Comment = require('../models/Comment');
const Note = require('../models/Note');
const User = require('../models/User');

const { DB_NOTES_LIMIT } = require('../constants');

module.exports = {
  addComment: async ({ content, noteId, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to add a comment');
    }

    try {
      const comment = await Comment.create({ 
        content,
        noteId: mongoose.Types.ObjectId(noteId),
        author: mongoose.Types.ObjectId(user.id),
      });

      await Note.findByIdAndUpdate(
        noteId,
        { $push: { comments: comment._id } },
        { new: true, useFindAndModify: false }
      );

      await User.findByIdAndUpdate(
        user.id,
        { $push: { comments: comment._id } },
        { new: true, useFindAndModify: false }
      );

      return comment;
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async ({ id, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to add a comment');
    }

    try {
      const comment = await Comment.findById(id);

      if (comment && String(comment.author) !== user.id) {
        throw new ForbiddenError('You don\'t have permission to delete this note');
      }

      await Note.findOneAndUpdate(
        { '_id': mongoose.Types.ObjectId(comment.noteId) }, 
        { $pull: { "items" : { id } } },
        { new: true },
      );
      
      await User.findOneAndUpdate(
        { '_id': mongoose.Types.ObjectId(comment.author) }, 
        { $pull: { "items" : { id } } },
        { new: true },
      );

      await comment.remove();

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  toggleFavorite: async ({ id, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to toggle a comment');
    }

    try {
      const comment = await Comment.findById(id);
      const hasUser = comment.favoritedBy.indexOf(user.id);

      if (hasUser >= 0) {
        return await Comment.findByIdAndUpdate(
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
        return await Comment.findByIdAndUpdate(
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


  getCommentsByIds: async ({ commentsIds }) => {
    return await Comment.find({'_id': { $in: commentsIds }});
  },
  getCommentsByUsername: async ({ username }) => {
    try {
      const user = await User.findOne({ username });

      return Comment.find({ 'author': user.id });
    } catch(err) {
      console.log(err);
    }
  },
  searchComments: async ({ text }) => {    
    return await Comment.find({ content: { $regex: text, $options: 'i' } }).limit(DB_NOTES_LIMIT);
  },
};