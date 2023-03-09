const auth = require('../middlewares/auth'),
  applicationsMiddleware = require('../middlewares/applications'),
  responseMiddleware = require('../middlewares/response');

module.exports = {
  post: [
    auth.initLocals,
    auth.authorize,
    applicationsMiddleware.initLocals,
    applicationsMiddleware.insertApplication,
    responseMiddleware.sendResponse(201, 'application'),
  ],
};

module.exports.post.apiDoc = {
  tags: ['applications'],
  description: 'Create a new application',

  requestBody: {
    description: 'Application object',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Application',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Successfully fetched list of applicants',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Application',
          },
        },
      },
    },
  },
  parameters: [
    {
      $ref: '#/components/parameters/personId',
    },
    {
      $ref: '#/components/parameters/sessionId',
    },
  ],
};
