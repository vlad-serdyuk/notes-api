const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');

const config = require('../config');
const User = require('../models/user');
const gravatar = require('../util/gravatar');

module.exports = {
  signUp: async ({ username, email, password }) => {
    try {
      const hashed = await bcrypt.hash(password, 10);
      
      const normalizedEmail = email.trim().toLowerCase();
      const avatar = gravatar(normalizedEmail);
      
      console.log({ hashed, username, normalizedEmail, avatar });
      

      const user = await User.create({
        username,
        email: normalizedEmail,
        avatar,
        password: hashed,
      });

      return jwt.sign({ id: user._id }, config.jwtToken);
    } catch (err) {
      throw new Error('Error creating account');
    }
  },
  signIn: async ({ email, password }) => {
    try {
      if (email) {
        email = email.trim().toLowerCase();
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Error singin in 1');
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new AuthenticationError('Error singin in 2');
      }

      return jwt.sign({ id: user._id }, config.jwtToken);
    } catch (err) {
      throw new AuthenticationError('Error singin in');
    }
  },
  getUser: (token) => {
    if (token) {
      try {
        return jwt.verify(token, config.jwtToken);
      } catch (err) {
        throw new Error('Session invalid');
      }
    }
  },
  getMe: async ({ user }) => {   
    return await User.findById(user.id);
  },
  getUserByUsername: async ({ username }) => {   
    return await User.findOne({ username });
  },
  getUsers: async () => {
    return await User.find({});
  },
  getAuthor: async ({ author }) => {
    return await User.findById(author);
  },
  getAuthorByFavoritedBy: async ({ favoritedBy }) => {
    return await User.find({ _id: { $in: favoritedBy } });
  },
};