import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
    favoritedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    private: {
      type: Boolean,
      default: false,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.models.Note ? mongoose.model('Note') : mongoose.model('Note', noteSchema);

module.exports = Note;