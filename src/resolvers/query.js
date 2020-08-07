const NoteService = require('../services/note-service');
const UserService = require('../services/user-service');

module.exports = {
  note: (_, { id }) => NoteService.getNoteById(id),
  notes: () => NoteService.getNotes(),
  notesFeed: (_, { cursor }) => NoteService.getNotesFeed({ cursor }),
  trendsNotes: () => NoteService.getTrendsNotes(),
  
  me: (_, args, { user }) => UserService.getMe({ user }),
  user: (_, { username }) => UserService.getUserByUsername({ username }),
  users: () => UserService.getUsers(),

  signOut: (_, args, { meta: { session } }) => UserService.signOut({ session }),
};
