const mongoose = require('mongoose');

const NoteService = require('./note-service');
const CommentService = require('./comment-service');
const UserService = require('./user-service');

module.exports = {
  search: async ({ text, user }) => {
    const notes = await NoteService.searchNotes({ text, user });
    const comments = await CommentService.searchComments({ text });
    const users = await UserService.searchUsers({ text });

    return [...notes, ...comments, ...users];
  },
};