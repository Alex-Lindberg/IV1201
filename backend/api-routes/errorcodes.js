const { sendErrorCodes } = require('../middlewares/errorcodes');
module.exports = {
	get: [sendErrorCodes],
};

module.exports.get.apiDoc = {
	tags: ['errorcodes'],
	responses: {
		200: {
			description: 'Successfully fecthed all error codes',
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/ListOfErrorCodes',
					},
				},
			},
		},
	},
};
