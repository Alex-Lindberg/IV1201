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
			description: 'Successfully fetched list of applicants',
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/SearchResults',
					},
				},
			},
		},
	},
	parameters: [
		{
			$ref: '#/components/parameters/size',
		},
		{
			$ref: '#/components/parameters/offset',
		},
		{
			$ref: '#/components/parameters/filterString',
		},
		{
			$ref: '#/components/parameters/orderBy',
		},
		{
			$ref: '#/components/parameters/filterBy',
		},
	],
};
