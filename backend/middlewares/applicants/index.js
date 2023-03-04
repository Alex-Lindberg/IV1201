const { applicantsDAO } = require('./applicantsDAO'),
  { errorCodes } = require('../errorcodes');

/**
 * It takes the `res.locals` object and adds a new property called `outData` to it
 * @param req - The request object.
 * @param res - the response object
 * @param next - This is a function that you call when you're done with your middleware.
 */
const initLocals = (req, res, next) => {
  res.locals = {
    ...res.locals,
    outData: {
      ...res.locals.outData,
      applicants: null,
      applicant: null,
    },
  };
  next();
};

/**
 * It fetches all applicants from the database and adds them to the response object
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that is called when the middleware is done.
 * @returns An array of applicants
 */
const getAllApplicants = async (req, res, next) => {
	const { filterString, orderBy, filterBy, offset, size } = req.query;
	try {
		res.locals.outData.applicants = await applicantsDAO.getApplicants(
			filterString,
			orderBy,
			filterBy,
			offset,
			size
		);

		next();
	} catch (err) {
		console.error('Error in getAllApplicants: ', err.message);
		return next(
			errorCodes.serverError({
				req,
				message: 'Could not fetch applicants',
			})
		);
	}
};

/**
 * It gets an applicant from the database and adds it to the response object
 * @param req - The request object
 * @param res - The response object
 * @param next - This is a function that you call when you're done with your middleware.
 * @returns The applicant object is being returned.
 */
const getApplicant = async (req, res, next) => {
  const applicantId = req.params.applicantId;
  try {
    const result = await applicantsDAO.getApplicant(applicantId);
    if (result.length === 0) {
      return next(
        errorCodes.notFound({
          req,
          message: `Applicant with id: ${applicantId} not found`,
        })
      );
    }
    res.locals.outData.applicant = result[0];
    next();
  } catch (err) {
    console.error('Error in getApplicant: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not fetch applicant',
      })
    );
  }
};

/**
 * It fetches the availability for an applicant
 * @param req - The request object
 * @param res - The response object.
 * @param next - This is a function that you call when you're done with your middleware.
 * @returns An array of objects with the following properties:
 */
const getAvailabilityForApplicant = async (req, res, next) => {
  const include = req.query.include;
  if (!include || !include.includes('availability')) {
    return next();
  }
  const applicantId = req.params.applicantId;
  try {
    const result = await applicantsDAO.getAvailabilityForApplicant(applicantId);
    if (result.length === 0) {
      return next(
        errorCodes.notFound({
          req,
          message: `Applicant availability with person_id: ${applicantId}  not found`,
        })
      );
    }
    res.locals.outData.applicant.availability = result[0];
    next();
  } catch (err) {
    console.error('Error in getAvailabilityForApplicant: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not fetch applicant availability',
      })
    );
  }
};

/**
 * It fetches the competence for an applicant
 * @param req - The request object
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The applicant's competence.
 */
const getCompetenceForApplicant = async (req, res, next) => {
  const include = req.query.include;
  if (!include || !include.includes('competence')) {
    return next();
  }
  const applicantId = req.params.applicantId;
  try {
    const result = await applicantsDAO.getCompetenceForApplicant(applicantId);
    if (result.length === 0) {
      return next(
        errorCodes.notFound({
          req,
          message: `Applicant competence with person_id: ${applicantId} not found`,
        })
      );
    }

    res.locals.outData.applicant.competence = result[0];
    next();
  } catch (err) {
    console.error('Error in getCompetenceForApplicant: ', err.message);
    return next(
      errorCodes.serverError({
        req,
        message: 'Could not fetch applicant competence',
      })
    );
  }
};

module.exports = {
  initLocals,
  getAllApplicants,
  getApplicant,
  getAvailabilityForApplicant,
  getCompetenceForApplicant,
};
