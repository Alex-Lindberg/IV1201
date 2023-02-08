const sendResponse = (status, path) => (req, res) => {
	if (!!path) res.status(status).json(res.locals.outData[path]);
	else res.sendStatus(status);
};

module.exports = {
	sendResponse,
};
