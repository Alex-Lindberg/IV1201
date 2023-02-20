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
	try {
		res.locals.outData.applicants = await applicantsDAO.getApplicants();
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

module.exports = {
	initLocals,
	getAllApplicants,
};
