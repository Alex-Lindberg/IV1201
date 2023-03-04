const auth = require('../../middlewares/auth'),
  applicantsMiddleware = require('../../middlewares/applicants'),
  responseMiddleware = require('../../middlewares/response');

module.exports = {
  get: [
    auth.initLocals,
    auth.authorize,
    applicantsMiddleware.initLocals,
    applicantsMiddleware.getApplicant,
    applicantsMiddleware.getAvailabilityForApplicant,
    applicantsMiddleware.getCompetenceForApplicant,
    responseMiddleware.sendResponse(200, 'applicant'),
  ],
};

module.exports.get.apiDoc = {
  tags: ['applicants'],
  responses: {
    200: {
      description: 'Successfully fecthed an applicant',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Applicant',
          },
        },
      },
    },
  },
  parameters: [
    {
      $ref: '#/components/parameters/includeParameter',
    },
    {
      $ref: '#/components/parameters/applicantId',
    },
    {
      $ref: '#/components/parameters/personId',
    },
    {
      $ref: '#/components/parameters/sessionId',
    },
  ],
};
