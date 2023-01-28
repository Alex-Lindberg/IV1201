const parameters = require('./components/parameters');
const schemas = require('./components/schemas');

module.exports = {
  openapi: '3.0.0',
  info: {
    version: '1.0',
    title: 'IV1201 - API',
    description: 'IV1201 - API',
    contact: {
      name: 'denhad@kth.se',
    },
  },
  servers: [
    {
      url: '/api',
    },
  ],
  security: [{ XAccessTokenAuth: [] }],
  paths: {},
  components: {
    securitySchemes: {
      XAccessTokenAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-ACCESS-TOKEN',
      },
    },
    parameters,
    schemas,
  },
};
