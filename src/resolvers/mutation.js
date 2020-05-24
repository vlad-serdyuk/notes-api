const NoteService = require('../services/note-service');

module.exports = {
  createNote: (parent, { content }) => NoteService.createNote({ content }),
  updateNote: (parent, { content, id }) => NoteService.updateNote({ id, content }),
  deleteNote: (parent, { id }) => NoteService.deleteNote(id),
};
