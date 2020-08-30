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
  signUp: async ({ username, email, password, session }) => {
    try {
      const hashed = await bcrypt.hash(password, 10);
      
      const normalizedEmail = email.trim().toLowerCase();
      const avatar = gravatar(normalizedEmail);

      const user = await User.create({
        username,
        email: normalizedEmail,
        avatar,
        password: hashed,
      });

      const token = jwt.sign({ id: user._id }, config.jwtToken);
      session.setToken(token);

      return true;
    } catch (err) {
      throw new Error('Error creating account');
    }
  },
  signIn: async ({ email, password, session }) => {
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
      
      const token = jwt.sign({ id: user._id }, config.jwtToken);
      session.setToken(token);

      return true;
    } catch (err) {
      throw new AuthenticationError('Error singin in');
    }
  },
  signOut: async ({ session }) => {
    session.removeToken();
    
    return true;
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
  updateUser: async ({ username, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a note');
    }

    try {
      const userDbItem = await User.findById(user.id);      

      if (userDbItem && String(userDbItem.id) !== user.id) {
        throw new ForbiddenError('You don\'t have permission to update this note');
      }

      return await User.findByIdAndUpdate(
        { _id: user.id },
        { $set: { username } },
        { new: true },
      );
    } catch (err) {
      console.log(err);
    }
  },
  resetPassword: async ({ oldPassword, newPassword, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a note');
    }

    try {
      const userDbItem = await User.findById(user.id);      

      if (userDbItem && String(userDbItem.id) !== user.id) {
        throw new ForbiddenError('You don\'t have permission to update this note');
      }

      const isValid = await bcrypt.compare(oldPassword, userDbItem.password);

      if (!isValid) {
        throw new AuthenticationError('Error singin in 2');
      }

      const hashed = await bcrypt.hash(newPassword, 10);

      return await User.findByIdAndUpdate(
        { _id: user.id },
        { $set: { password: hashed } },
        { new: true },
      );
    } catch (err) {
      console.log(err);
    }
  },

  getMe: async ({ user }) => {   
    if (!user) {
      return;
    }
    
    try {
      return await User.findById(user.id);
    } catch (err) {
      throw new Error('Error finding user');
    }
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