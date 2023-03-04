const auth = require('../middlewares/auth'),
  responseMiddleware = require('../middlewares/response');

module.exports = {
  post: [
    auth.initLocals,
    auth.createUser,
    auth.createSession,
    responseMiddleware.sendResponse(201, 'outData'),
  ],
};

module.exports.post.apiDoc = {
  tags: ['auth'],
  requestBody: {
    required: true,
    description: 'Sign up',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SignUpData',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Successfully signed up',
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
