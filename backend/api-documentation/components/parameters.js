module.exports = {
  applicantId: {
    in: 'path',
    name: 'applicantId',
    schema: {
      type: 'integer',
    },
    required: true,
  },
  includeParameter: {
    name: 'include',
    in: 'query',
    description: 'A comma separated list of properties to include in the response',
    schema: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['availability', 'competence'],
      },
    },
  },
  personId: {
    name: 'person_id',
    in: 'header',
    description: 'Contains the person_id of the user',
    required: true,
    schema: {
      $ref: '#/components/schemas/GenericId',
    },
  },
  sessionId: {
    name: 'session_id',
    in: 'header',
    description: 'Contains the session_id of the user',
    required: true,
    schema: {
      $ref: '#/components/schemas/Uuid',
    },
  },
};
