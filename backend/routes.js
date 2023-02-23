const swaggerUi = require('swagger-ui-express');
const openapi = require('express-openapi');
const path = require('path');

const createApiDocPaths = require('./utils/createApiDocPaths');
const { globalErrorHandler } = require('./middlewares/errorHandler');

function initOpenApiRoutes({ app, apiDoc, apiSrcPath }) {
	openapi.initialize({
		apiDoc: apiDoc,
		app: app,
		paths: path.resolve(__dirname, apiSrcPath),
		errorMiddleware: globalErrorHandler,
	});
}

function getJson(apiDoc) {
	return (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(apiDoc);
	};
}

function getHtml(apiDoc) {
	const options = {
		explorer: true,
	};

	return [swaggerUi.serveFiles(apiDoc, options), swaggerUi.setup(apiDoc)];
}

function init(app) {
	const apiDoc = require('./api-documentation');

	const apiDocPathsAppended = {
		...apiDoc,
		paths: createApiDocPaths(path.resolve(__dirname, 'api-routes')),
	};
	app.use('/api/api-docs.json', getJson(apiDocPathsAppended));
	app.use('/api/api-docs', getHtml(apiDocPathsAppended));
	initOpenApiRoutes({
		app: app,
		apiDoc: apiDoc,
		apiSrcPath: './api-routes',
	});
}

module.exports = {
	init,
};
