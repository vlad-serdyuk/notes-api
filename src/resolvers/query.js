const NoteService = require('../services/note-service');

module.exports = {
  note: (parent, { id }) => NoteService.getNoteById(id),
  notes: () => NoteService.getNotes(),
};
