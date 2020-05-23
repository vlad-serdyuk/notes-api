const notes = require('../models/Note');

module.exports = {
  note: (parent, { id }) => notes.find(note => note.id === id),
  notes: () => notes,
};
