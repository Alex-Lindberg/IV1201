const { applicationsDAO } = require('./applicationsDAO');
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
    await applicationsDAO.beginQuery();
    const results = await Promise.all(
      competences.map(async (competence) => {
        const result = await applicationsDAO.insertCompetenceProfile(competence, person_id);
        console.log('🚀 ~ file: index.js:21 ~ competences.map ~ result:', result);
        return { ...result, name: competence.name };
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

const prepareInsertAvailabilities = async (req, res, next) => {
  const { availabilities } = req.body;
  const { person_id } = req.headers;
  try {
    const results = await Promise.all(
      availabilities.map(async (availability) => {
        const result = await applicationsDAO.insertAvailability(availability, person_id);
        return result;
      })
    );
    const test = await applicationsDAO.commitQuery();
    res.locals.outData.application.availabilities = results;
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

// const

module.exports = {
  initLocals,
  insertCompetenceProfiles,
  insertAvailabilities,
};
