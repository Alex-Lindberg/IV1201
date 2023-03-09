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

const insertCompetenceProfiles = async (req, res, next) => {
  const { competences } = req.body;
  const { person_id } = req.headers;
  try {
    const results = await Promise.all(
      competences.map(async (competence) => {
        const result = await applicationsDAO.insertCompetenceProfile(competence, person_id);
        return result;
      })
    );
    res.locals.outData.application.competences = results;
    return next();
  } catch (err) {
    console.error('Error in insertCompetenceProfiles: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not insert competence profiles',
      })
    );
  }
};

const insertAvailabilities = async (req, res, next) => {
  console.log('🚀 ~ file: index.js:39 ~ insertAvailabilities ~ req.body:', req.body);
  const { availabilities } = req.body;
  const { person_id } = req.headers;
  try {
    const results = await Promise.all(
      availabilities.map(async (availability) => {
        const result = await applicationsDAO.insertAvailability(availability, person_id);
        return result;
      })
    );
    res.locals.outData.application.availabilities = results;
    console.log(
      '🚀 ~ file: index.js:49 ~ insertAvailabilities ~ res.locals.outData.application:',
      res.locals.outData.application
    );
    return next();
  } catch (err) {
    console.error('Error in insertAvailabilities: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not insert availabilities',
      })
    );
  }
};

const commitQueries = async (req, res, next) => {
  try {
    await applicationsDAO.commitQuery(res.locals.queries);
    return next();
  } catch (err) {
    console.error('Error in commitQueries: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not commit queries',
      })
    );
  }
};

// const

module.exports = {
  initLocals,
  insertCompetenceProfiles,
  // insertAvailabilities,
  insertAvailabilities,
  commitQueries,
};
