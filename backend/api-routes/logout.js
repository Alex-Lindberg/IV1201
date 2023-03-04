const auth = require('../middlewares/auth'),
  responseMiddleware = require('../middlewares/response');

module.exports = {
  delete: [
    auth.initLocals,
    auth.checkIfSessionExists,
    auth.deleteSession,
    responseMiddleware.sendResponse(204),
  ],
};

module.exports.delete.apiDoc = {
  tags: ['auth'],
  responses: {
    204: {
      description: 'Successfully logged out',
    },
  },
};
