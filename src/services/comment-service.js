const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');

const Comment = require('../models/Comment');
const Note = require('../models/Note');
const User = require('../models/user');

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
};