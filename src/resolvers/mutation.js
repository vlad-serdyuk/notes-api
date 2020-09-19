const NoteService = require('../services/note-service');
const UserService = require('../services/user-service');

module.exports = {
  createNote: (_, { content, private }, { user }) => NoteService.createNote({ content, private, user }),
  updateNote: (_, { content, id }, { user }) => NoteService.updateNote({ id, content, user }),
  deleteNote: (_, { id }, { user }) => NoteService.deleteNote({ id, user }),

  toggleFavorite: (_, { id }, { user }) => NoteService.toggleFavorite({ id, user }),
  togglePrivacy: (_, { id, private }, { user }) => NoteService.togglePrivacy({ id, private, user }),

  updateUser: (_, { username }, { user }) => UserService.updateUser({ username, user }),
  resetPassword: (_, { oldPassword, newPassword }, { user }) => UserService.resetPassword({ oldPassword, newPassword, user }),

  signUp: (_, { username, email, password }, { meta: { session } }) => UserService.signUp({ username, email, password, session }),
  signIn: (_, { email, password }, { meta: { session } }) => UserService.signIn({ email, password, session }),
};
