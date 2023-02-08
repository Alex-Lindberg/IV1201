const auth = require('../middlewares/auth'),
	applicantsMiddleware = require('../middlewares/applicants'),
	responseMiddleware = require('../middlewares/response');

module.exports = {
	get: [
		auth.initLocals,
		auth.authorize,
		applicantsMiddleware.initLocals,
		applicantsMiddleware.getAllApplicants,
		responseMiddleware.sendResponse(200, 'applicants'),
	],
};

module.exports.get.apiDoc = {
	tags: ['applicants'],
	responses: {
		200: {
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
};
