const { applicantsDAO } = require('./applicantsDAO'),
	{ errorCodes } = require('../errorcodes');

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
