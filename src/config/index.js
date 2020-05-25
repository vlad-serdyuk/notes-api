const dotenv = require('dotenv').config();

if (dotenv.error) {
  throw new Error('Couldn\'t find .env file');
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  port: process.env.PORT || 4000,
  dbHost: process.env.DB_HOST,
  jwtToken: process.env.JWT_SECRET,
};
