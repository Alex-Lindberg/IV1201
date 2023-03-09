const { errorCodes } = require('../errorcodes'),
  { applicationsDAO } = require('./applicationsDAO');
const initLocals = (req, res, next) => {
  res.locals = {
    ...res.locals,
    inData: {},
    outData: {
      application: {},
    },
  };
  next();
};

const insertApplication = async (req, res, next) => {
  const { availabilities, competences } = req.body;
  const { person_id } = req.headers;
  try {
    const result = await applicationsDAO.insertApplication(person_id, availabilities, competences);
    res.locals.outData.application = result;
    return next();
  } catch (err) {
    console.error('Error in insertApplication: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not insert application',
      })
    );
  }
};

module.exports = {
  initLocals,
  insertApplication,
};
