const NoteService = require('../services/note-service');
const UserService = require('../services/user-service');

module.exports = {
  createNote: (parent, { content }, { user }) => NoteService.createNote({ content, user }),
  updateNote: (parent, { content, id }, { user }) => NoteService.updateNote({ id, content, user }),
  deleteNote: (parent, { id }, { user }) => NoteService.deleteNote({ id, user }),

  toggleFavorite: (parent, { id }, { user }) => NoteService.toggleFavorite({ id, user }),

  signUp: (parent, { username, email, password }, { meta: { session } }) => UserService.signUp({ username, email, password, session }),
  signIn: (parent, { email, password }, { meta: { session } }) => UserService.signIn({ email, password, session }),
};
