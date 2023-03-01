const { errorCodes } = require('../errorcodes');
const { authDAO } = require('./authDAO');
const initLocals = (req, res, next) => {
	res.locals = {
		...res.locals,
		inData: {},
		outData: {},
	};
	next();
};

const authorize = async (req, res, next) => {
	next();
};

const signup = async (req, res, next) => {
	const { signupData } = req.body;
	try {
		const result = await authDAO.registerApplicant(signupData);
		res.locals.outData = result;
		next();
	} catch (err) {
		console.error('Error in signup: ', err.message);
		return next(
			errorCodes.serverError({
				req,
				message: 'Could not signup',
			})
		);
	}
};

module.exports = {
	initLocals,
	authorize,
	signup,
};
