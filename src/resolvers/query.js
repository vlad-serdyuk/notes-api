const NoteService = require('../services/note-service');
const UserService = require('../services/user-service');
const CommentService = require('../services/comment-service');

module.exports = {
  note: (_, { id }) => NoteService.getNoteById(id),
  notes: () => NoteService.getNotes(),
  notesFeed: (_, { cursor }, { user }) => NoteService.getNotesFeed({ cursor, user }),
  trendsNotes: () => NoteService.getTrendsNotes(),
  searchNotes: (_, { text }, { user }) => NoteService.searchNotes({ text, user }),

  search: (_, { text }, { user }) => NoteService.search({ text, user }),
  
  me: (_, args, { user }) => UserService.getMe({ user }),
  user: (_, { username }) => UserService.getUserByUsername({ username }),
  users: () => UserService.getUsers(),
  userComments: (_, { username }) => CommentService.getCommentsByUsername({ username }),

  signOut: (_, args, { meta: { session } }) => UserService.signOut({ session }),
};
