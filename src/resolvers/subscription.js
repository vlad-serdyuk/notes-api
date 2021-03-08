const { pubsub } = require('../services/PubSub');

module.exports = {
  notesFeedUpdated: {
    subscribe: () => pubsub.asyncIterator(['NOTE_CREATED']),
  },
};