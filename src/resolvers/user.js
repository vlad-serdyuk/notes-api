const NoteService = require('../services/note-service');

module.exports = {
  notes: ({ _id: id }) => NoteService.getNotesByUserId({ id }),
  favorites: ({ _id: id }) => NoteService.geFavoritesNotesByUserID({ id }),
  comments: () => [],
};