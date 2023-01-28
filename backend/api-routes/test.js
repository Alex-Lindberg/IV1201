module.exports = {
  get: [(req, res, next) => res.send({ testData: 'This is a response from the GET method' })],
};

module.exports.get.apiDoc = {
  tags: ['test'],
  responses: {
    200: {
      description: 'Successfully fecthed test data',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/TestData',
          },
        },
      },
    },
  },
};
