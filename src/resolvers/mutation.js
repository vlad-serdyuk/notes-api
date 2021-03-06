const NoteService = require('../services/note-service');
const UserService = require('../services/user-service');
const CommentService = require('../services/comment-service');
const { pubsub } = require('../services/PubSub');

module.exports = {
  createNote: async (_, { content, private: isPrivate }, { user }) => {
    const note = await NoteService.createNote({ content, private: isPrivate, user });
    pubsub.publish('NOTE_CREATED', { notesFeedUpdated: note });
    return note;
  },
  updateNote: (_, { content, id, private: isPrivate }, { user }) => NoteService.updateNote({ id, content, private: isPrivate, user }),
  deleteNote: (_, { id }, { user }) => NoteService.deleteNote({ id, user }),

  toggleFavorite: (_, { id }, { user }) => NoteService.toggleFavorite({ id, user }),
  togglePrivacy: (_, { id, private: isPrivate }, { user }) => NoteService.togglePrivacy({ id, private: isPrivate, user }),

  updateUser: (_, { username }, { user }) => UserService.updateUser({ username, user }),
  resetPassword: (_, { oldPassword, newPassword }, { user }) => UserService.resetPassword({ oldPassword, newPassword, user }),

  addComment: (_, { content, noteId }, { user }) => CommentService.addComment({ content, noteId, user }),
  deleteComment: (_, { id }, { user }) => CommentService.deleteComment({ id, user }),
  toggleFavoriteComment: (_, { id }, { user }) => CommentService.toggleFavorite({ id, user }),

  signUp: (_, { username, email, password }, { meta: { session } }) => UserService.signUp({ username, email, password, session }),
  signIn: (_, { email, password }, { meta: { session } }) => UserService.signIn({ email, password, session }),
};
