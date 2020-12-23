const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String
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

const User = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', userSchema);

module.exports = User;