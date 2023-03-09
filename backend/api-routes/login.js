const auth = require('../middlewares/auth'),
  responseMiddleware = require('../middlewares/response');

module.exports = {
  post: [
    auth.initLocals,
    auth.getUser,
    auth.createSession,
    responseMiddleware.sendResponse(200, 'outData'),
  ],
};

module.exports.post.apiDoc = {
  tags: ['auth'],
  requestBody: {
    required: true,
    description: 'Logg in',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/LoginData',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successfully logged in',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserAndSession',
          },
        },
      },
    },
  },
};
