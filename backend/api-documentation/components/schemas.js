module.exports = {
  TestData: {
    type: 'object',
    additionalProperties: false,
    required: ['data'],
    properties: {
      data: {
        type: 'string',
        example: 'This is a test string',
      },
    },
  },
};
