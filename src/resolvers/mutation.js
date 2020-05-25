const NoteService = require('../services/note-service');
const UserService = require('../services/user-service');

module.exports = {
  createNote: (parent, { content }) => NoteService.createNote({ content }),
  updateNote: (parent, { content, id }) => NoteService.updateNote({ id, content }),
  deleteNote: (parent, { id }) => NoteService.deleteNote(id),

  signUp: (parent, { username, email, password }) => UserService.signUp({ username, email, password }),
  signIn: (parent, { email, password }) => UserService.signIn({ email, password }),
};
