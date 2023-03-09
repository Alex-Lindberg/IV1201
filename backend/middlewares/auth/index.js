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
  const { expiration_date } = res.locals.session;
  if (expiration_date < new Date()) {
    return next(
      errorCodes.unauthorized({
        req,
        message: `Session expired`,
      })
    );
  }
  await authDAO.refreshSession(res.locals.session.person_id);
  return next();
};

/**
 * It takes in a request, response, and next object, and then creates a new user in the database
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that you call when you're done with your middleware.
 * @returns The user object is being returned.
 */
const createUser = async (req, res, next) => {
  if (res.locals.userExists) {
    return next(
      errorCodes.badRequest({
        req,
        message: 'User already exists',
      })
    );
  }
  const data = req.body;
  try {
    res.locals.outData.user = await authDAO.createUser(data);
    res.locals.userExists = true;
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
    res.locals.userExists = true;
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
    const result = await authDAO.getSession(person_id, session_id);
    if (result.length === 0) {
      return next(
        errorCodes.unauthorized({
          req,
          message: `Session with session_id: ${session_id} not found`,
        })
      );
    }
    res.locals.session = result[0];
    next();
  } catch (err) {
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
    if (!!res.locals.userExists) {
      res.locals.outData.session = await authDAO.getSession(person_id);
      if (!!res.locals.outData.session && res.locals.outData.session.length > 0) {
        await authDAO.refreshSession(person_id);
        return next();
      }
      res.locals.outData.session = await authDAO.createSession(person_id);
      return next();
    } else {
      throw new Error('User does not exist');
    }
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
  const { session_id } = req.headers;
  try {
    const result = await authDAO.getSession(session_id);
    if (result.length === 0) {
      return next(
        errorCodes.unauthorized({
          req,
          message: `Session with session_id: ${session_id} not found`,
        })
      );
    }
    res.locals.outData.session = result[0];
    return next();
  } catch (err) {
    console.error('Error in checkIfSessionExists: ', err.message);
    return next(errorCodes.serverError({ req, message: 'Could not get session' }));
  }
};

/**
 * It checks if a user exists in the database
 * @param req - The request object.
 * @param res - the response object
 * @param next - This is a function that is called when the middleware is complete.
 */
const checkIfUserExists = async (req, res, next) => {
  const { username } = req.body || req.headers;
  try {
    res.locals.userExists = await authDAO.checkIfUserExists(username);
    next();
  } catch (err) {
    console.error('Error in checkIfUserExists: ', err.message);
  }
};

/**
 * This function gets the role of a user from the database
 * @param req - the request object
 * @param res - the response object
 * @param next - This is a function that is called when the middleware is done.
 */
const getRole = async (req, res, next) => {
  const { person_id } = req.body ? req.body : req.headers;
  console.log('person_id: ', person_id);
  try {
    res.locals.outData.role = await authDAO.getRole(person_id);
    next();
  } catch (err) {
    console.error('Error in getRole: ', err.message);
  }
};

/**
 * It takes the person_id from the request headers, queries the database for the user with that
 * person_id, and stores the user in res.locals.user
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that you call when you're done with your middleware.
 * @returns The user object is being returned.
 */
const storeUser = async (req, res, next) => {
  const { person_id } = req.headers;
  try {
    const user = await authDAO.getUserById(person_id);
    if (user.length === 0) {
      return next(
        errorCodes.unauthorized({
          req,
          message: `User with person_id: ${person_id} not found`,
        })
      );
    }
    res.locals.user = user[0];
    next();
  } catch (err) {
    console.error('Error in storeUser: ', err.message);

    return next(
      errorCodes.serverError({
        req,
        message: 'Could not store user',
      })
    );
  }
};

module.exports = {
  initLocals,
  authorize: [storeUser, getSession, authorize],
  createUser,
  createSession,
  getUser,
  deleteSession,
  checkIfSessionExists,
  checkIfUserExists,
  getRole,
};
