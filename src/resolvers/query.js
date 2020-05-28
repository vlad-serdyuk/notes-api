const NoteService = require('../services/note-service');
const UserService = require('../services/user-service');

module.exports = {
  note: (parent, { id }) => NoteService.getNoteById(id),
  notes: () => NoteService.getNotes(),
  notesFeed: (parent, { cursor }) => NoteService.getNotesFeed({ cursor }),
  
  me: (parent, args, { user }) => UserService.getMe({ user }),
  user: (parent, { username }) => UserService.getUserByUsername({ username }),
  users: () => UserService.getUsers(),
};
