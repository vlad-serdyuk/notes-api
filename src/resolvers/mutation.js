const NoteService = require('../services/note-service');
const UserService = require('../services/user-service');
const CommentService = require('../services/comment-service');

module.exports = {
  createNote: (_, { content, private }, { user }) => NoteService.createNote({ content, private, user }),
  updateNote: (_, { content, id, private }, { user }) => NoteService.updateNote({ id, content, private, user }),
  deleteNote: (_, { id }, { user }) => NoteService.deleteNote({ id, user }),

  toggleFavorite: (_, { id }, { user }) => NoteService.toggleFavorite({ id, user }),
  togglePrivacy: (_, { id, private }, { user }) => NoteService.togglePrivacy({ id, private, user }),

  updateUser: (_, { username }, { user }) => UserService.updateUser({ username, user }),
  resetPassword: (_, { oldPassword, newPassword }, { user }) => UserService.resetPassword({ oldPassword, newPassword, user }),

  addComment: (_, { content, noteId }, { user }) => CommentService.addComment({ content, noteId, user }),
  deleteComment: (_, { id }, { user }) => CommentService.deleteComment({ id, user }),

  signUp: (_, { username, email, password }, { meta: { session } }) => UserService.signUp({ username, email, password, session }),
  signIn: (_, { email, password }, { meta: { session } }) => UserService.signIn({ email, password, session }),
};
