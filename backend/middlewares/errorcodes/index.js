const Boom = require('@hapi/boom'),
	_ = require('lodash');

const boomErrorCodes = {
	forbidden: function ({ req, message = 'Forbidden' }) {
		return Boom.forbidden('', {
			statusCode: 403,
			error: 'Forbidden',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
	// unathorized: function ({ req, message = 'Unathorized' }) {
	// 	return Boom.unauthorized('Un-authenticated request', '', {
	// 		statusCode: 401,
	// 		error: 'Unathorized',
	// 		method: req.method,
	// 		path: req.url,
	// 		message: message,
	// 	});
	// },
	serverError: function ({ req, message = 'Server error' }) {
		return Boom.badImplementation('', {
			statusCode: 500,
			errorCode: 'Server error',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
	notFound: function ({ req, message = 'Not Found' }) {
		return Boom.notFound('', {
			statusCode: 404,
			errorCode: 'Not found',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
	badRequest: function ({ req, message = 'Invalid value' }) {
		return Boom.badRequest('', {
			statusCode: 400,
			errorCode: 'Invalid value',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
};

const sendErrorCodes = (req, res, next) => {
	res.status(200).json(
		_(boomErrorCodes)
			.values()
			.map((x) => {
				return x({ req }).data;
			})
			.value()
	);
};

module.exports = {
	errorCodes: boomErrorCodes,
	sendErrorCodes,
};
