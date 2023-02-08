const Boom = require('@hapi/boom'),
	_ = require('lodash');

const boomErrorCodes = {
	forbidden: function ({ req, message = 'Forbidden' }) {
		return Boom.forbidden('', {
			errorCode: 'forbidde.validation',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
	serverError: function ({ req, message = 'Server error' }) {
		return Boom.badImplementation('', {
			errorCode: 'forbidden.validation',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
	notFound: function ({ req, message = 'Not Found' }) {
		return Boom.notFound('', {
			errorCode: 'db.notFound',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
	sameValue: function ({ req, message = 'Same value' }) {
		return Boom.badRequest('', {
			errorCode: 'db.sameValue',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
	invalidValue: function ({ req, message = 'Invalid value' }) {
		return Boom.badRequest('', {
			errorCode: 'db.invalidValue',
			method: req.method,
			path: req.url,
			message: message,
		});
	},
	badRequest: function ({ message }) {
		return Boom.badRequest(message);
	},
};

module.exports = {
	errorCodes: boomErrorCodes,
	get: [
		function (req, res, next) {
			res.status(200).json(
				_(boomErrorCodes)
					.values()
					.map((x) => {
						return x({}).data;
					})
					.value()
			);
		},
	],
};
