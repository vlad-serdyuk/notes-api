const UserService = require('../services/user-service');

module.exports = {
  author: ({ author }) => UserService.getAuthor({ author }),
};