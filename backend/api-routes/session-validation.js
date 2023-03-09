const auth = require('../middlewares/auth'),
  responseMiddleware = require('../middlewares/response');

module.exports = {
  post: [
    auth.initLocals,
    auth.authorize,
    auth.getRole,
    responseMiddleware.sendResponse(201, 'outData'),
  ],
};

module.exports.post.apiDoc = {
  tags: ['auth'],
  requestBody: {
    required: true,
    description: 'validate session',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SessionsValidation',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Successfully validated session',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SessionsValidationResponse',
          },
        },
      },
    },
  },
};
