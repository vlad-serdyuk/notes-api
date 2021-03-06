const NoteService = require('../services/note-service');

module.exports = {
  notesFeedUpdated: () => NoteService.getNotesByUserId({ id }),
};