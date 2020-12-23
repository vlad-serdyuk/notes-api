const UserService = require('../services/user-service');
const CommentService = require('../services/comment-service');

module.exports = {
  author: ({ author }) => UserService.getAuthor({ author }),
  favoritedBy: ({ favoritedBy }) => UserService.getAuthorByFavoritedBy({ favoritedBy }),
  comments: ({ comments: commentsIds }) => CommentService.getCommentsByIds({ commentsIds }),
};