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

module.exports = {
	initLocals,
	authorize,
};
