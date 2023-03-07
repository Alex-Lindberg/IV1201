const { errorCodes } = require('../errorcodes');
const { authDAO } = require('./authDAO');
/**
 * `initLocals` is a function that takes in a request, response, and next function, and sets the
 * `res.locals` object to an object with the `res.locals` object, an `inData` object, and an `outData`
 * object
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a callback function that tells Express to move on to the next middleware
 * function in the stack.
 */
const initLocals = (req, res, next) => {
  res.locals = {
    ...res.locals,
    inData: {},
    outData: {},
  };
  next();
};

/**
 * If the session has expired, return an unauthorized error
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns A function that is used as middleware to check if the session has expired.
 */
const authorize = async (req, res, next) => {
  const { expiration_date } = res.locals.outData.session;
  if (expiration_date < new Date()) {
    return next(
      errorCodes.unauthorized({
        req,
        message: `Session expired`,
      })
    );
  }

  next();
};

/**
 * It takes in a request, response, and next object, and then creates a new user in the database
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that you call when you're done with your middleware.
 * @returns The user object is being returned.
 */
const createUser = async (req, res, next) => {
  const data = req.body;
  try {
    res.locals.outData.user = await authDAO.createUser(data);
    next();
  } catch (err) {
    console.error('Error in createUser: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not signup a new user',
      })
    );
  }
};

/**
 * It takes in a username and password from the request body, and then uses the authDAO to get the user
 * from the database. If the user is not found, it returns a 401 error. If the user is found, it sets
 * the user in the response locals and calls next
 * @param req - The request object
 * @param res - The response object
 * @param next - a function that will be called when the middleware is done.
 * @returns The user object is being returned.
 */
const getUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await authDAO.getUser(username, password);
    if (result.length === 0) {
      return next(
        errorCodes.unauthorized({
          req,
          message: `User with username: ${username} not found`,
        })
      );
    }
    res.locals.outData.user = result[0];
    next();
  } catch (err) {
    console.error('Error in getUser: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not get user',
      })
    );
  }
};

/**
 * It gets a session from the database and adds it to the response object
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that you call when you're done with your middleware.
 * @returns The session object is being returned.
 */
const getSession = async (req, res, next) => {
  const { session_id, person_id } = req.headers;
  try {
    const result = await authDAO.getSession(session_id, person_id);
    if (result.length === 0) {
      return next(
        errorCodes.unauthorized({
          req,
          message: `Session with session_id: ${session_id} not found`,
        })
      );
    }
    res.locals.outData.session = result[0];
    next();
  } catch (err) {
    console.log('🚀 ~ file: index.js:87 ~ getSession ~ err:', err);
    console.error('Error in getSession: ', err.message);
    return next(errorCodes.serverError({ req, message: 'Could not get session' }));
  }
};

/**
 * It creates a session for the user
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that is called when the middleware is done.
 * @returns The session object is being returned.
 */
const createSession = async (req, res, next) => {
  const { person_id } = res.locals.outData.user;
  try {
    const result = await authDAO.createSession(person_id);
    res.locals.outData.session = result;
    next();
  } catch (err) {
    console.error('Error in createSession: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not create a session',
      })
    );
  }
};

/**
 * It deletes a session from the database
 * @param req - The request object
 * @param res - the response object
 * @param next - This is a function that is called when the middleware is done.
 * @returns The session_id is being returned.
 */
const deleteSession = async (req, res, next) => {
  const { session_id } = req.headers;
  try {
    const result = await authDAO.deleteSession(session_id);
    res.locals.outData.session = result;
    next();
  } catch (err) {
    console.error('Error in deleteSession: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not delete a session',
      })
    );
  }
};

/**
 * If the session_id and person_id are found in the database, then the next function is called. If not,
 * then an error is thrown
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that you call when you want to move on to the next middleware.
 * @returns a function that is being used as middleware.
 */
const checkIfSessionExists = async (req, res, next) => {
  const { session_id, person_id } = req.headers;
  try {
    const result = await authDAO.getSession(session_id, person_id);
    if (result.length === 0) {
      return next(
        errorCodes.unauthorized({
          req,
          message: `Session with session_id: ${session_id} not found`,
        })
      );
    }
    next();
  } catch (err) {
    console.error('Error in checkIfSessionExists: ', err.message);
    return next(errorCodes.serverError({ req, message: 'Could not get session' }));
  }
};

module.exports = {
  initLocals,
  authorize: [getSession, authorize],
  createUser,
  createSession,
  getUser,
  deleteSession,
  checkIfSessionExists,
};
