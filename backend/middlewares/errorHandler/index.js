const Boom = require('@hapi/boom'),
  _ = require('lodash');

/**
 * If the error is a Boom error, return the error data, otherwise return a generic server error
 * @param err - The error object
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that you call when you're done with your middleware.
 * @returns A function that takes in 4 parameters. Which is the global error handling middleware.
 */
const globalErrorHandler = (err, req, res, next) => {
  if (Boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.data);
  }
  if (err.status === 400) {
    return res.status(400).json({
      statusCode: 400,
      errorCode: 'Bad request',
      method: req.method,
      path: req.url,
      message: err.errors[0].message,
    });
  }
  return res.status(500).json({
    statusCode: 500,
    errorCode: 'Server error',
    method: req.method,
    path: req.url,
    message: 'Unknown server error',
  });
};

module.exports = {
  globalErrorHandler,
};
