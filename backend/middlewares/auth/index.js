const { errorCodes } = require('../errorcodes');
const { authDAO } = require('./authDAO');
const initLocals = (req, res, next) => {
	res.locals = {
		...res.locals,
		inData: {},
		outData: {
			signupData: {},
		},
	};
	next();
};

const authorize = async (req, res, next) => {
	next();
};

const createUser = async (req, res, next) => {
	const data = req.body;
	try {
		const result = await authDAO.createUser(data);
		res.locals.outData.signupData.user = result;
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

const createSession = async (req, res, next) => {
	const { person_id } = res.locals.outData.signupData.user;
	try {
		const result = await authDAO.createSession(person_id);
		res.locals.outData.signupData.session = result;
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

module.exports = {
	initLocals,
	authorize,
	createUser,
	createSession,
};
