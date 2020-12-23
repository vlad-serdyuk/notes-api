const NoteService = require('../services/note-service');
const CommentService = require('../services/comment-service');

module.exports = {
  notes: ({ _id: id }) => NoteService.getNotesByUserId({ id }),
  favorites: ({ _id: id }) => NoteService.geFavoritesNotesByUserID({ id }),
  comments: ({ comments: commentsIds }) => CommentService.getCommentsByIds({ commentsIds }),
};