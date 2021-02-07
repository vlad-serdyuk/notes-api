module.exports = {
  __resolveType(obj, context, info) {
    if (obj.noteId) {
      return 'Comment';
    }
    if (obj.username) {
      return 'User';
    }
    if (obj.private) {
      return 'Note';
    }

    return null; // GraphQLError is thrown
  },
};