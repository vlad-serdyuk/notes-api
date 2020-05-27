const UserService = require('../services/user-service');

module.exports = {
  author: ({ author }) => UserService.getAuthor({ author }),
  favoritedBy: ({ favoritedBy }) => UserService.getAuthorByFavoritedBy({ favoritedBy }),
};