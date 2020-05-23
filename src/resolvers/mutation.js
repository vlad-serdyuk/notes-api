const notes = require('../models/Note');

module.exports = {
  newNote: (parent, { content }) => {
    let newNote = {
      id: String(notes.length + 1),
      content,
      author: 'Vlad',
    };

    notes.push(newNote);
    return newNote;
  },
};
