const auth = require('../middlewares/auth'),
  applicantsMiddleware = require('../middlewares/applicants'),
  responseMiddleware = require('../middlewares/response');

module.exports = {
  post: [
    auth.initLocals,
    auth.authorize,
    // applicantsMiddleware.initLocals,
    // applicantsMiddleware.getAllApplicants,
    // responseMiddleware.sendResponse(200, 'applicants'),
  ],
};

module.exports.post.apiDoc = {
  tags: ['applications'],
  responses: {
    201: {
      description: 'Successfully fecthed list of applicants',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ListOfApplicants',
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
