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
  unauthorized: function ({ req, message = 'Unauthorized' }) {
    return Boom.unauthorized('', 'sample', {
      statusCode: 401,
      errorCode: 'Unauthorized',
      method: req.method,
      path: req.url,
      message: message,
    });
  },
};

/**
 * It takes the error codes from the `boomErrorCodes` object, creates a `Boom` error object for each
 * one, and then returns the `data` property of each error object
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware in the chain.
 */
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
