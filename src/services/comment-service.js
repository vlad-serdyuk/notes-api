const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');

const Comment = require('../models/Comment');
const Note = require('../models/Note');
const User = require('../models/User');

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

      await comment.remove();
      
      //TODO: add removing from user and notes as well

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};