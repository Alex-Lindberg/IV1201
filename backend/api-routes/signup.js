const signup = require('../middlewares/auth'),
	responseMiddleware = require('../middlewares/response');

module.exports = {
	post: [
		signup.initLocals,
		signup.signup,
		responseMiddleware.sendResponse(200, 'signup'),
	],
};

module.exports.post.apiDoc = {
	tags: ['signup'],
	responses: {
		200: {
			description: 'Successfully signed up',
			content: {
				'application/json': {
					schema: {
						$ref: '#/components/schemas/SignUp',
					},
				},
			},
		},
	},
};
