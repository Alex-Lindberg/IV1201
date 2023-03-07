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
		description:
			'A comma separated list of properties to include in the response',
		schema: {
			type: 'array',
			items: {
				type: 'string',
				enum: ['availability', 'competence'],
			},
		},
	},
	filterString: {
		name: 'filterString',
		in: 'query',
		description: 'A string to filter the applicants by according to "filterBy" parameter',
		schema: {
			type: 'string',
			example: 'John',
		},
	},
	orderBy: {
		name: 'orderBy',
		in: 'query',
		description: 'A string to order the applicants by defaults to "desc"',
		schema: {
			type: 'string',
			enum: ['asc', 'desc'],
			example: 'asc',
		},
	},
	filterBy: {
		name: 'filterBy',
		in: 'query',
		description: 'A column name to filter the applicants by',
		schema: {
			type: 'string',
			enum: ['surname'],
			example: 'surname',
		},
	},
	offset: {
		name: 'offset',
		in: 'query',
		description: ' The number of applicants to skip ( 0 if not specified ) ',
		schema: {
			type: 'integer',
			example: 0,
		},
	},
	size: {
		name: 'size',
		in: 'query',
		description: 'The number of applicants to return ( All if not specified )',
		schema: {
			type: 'integer',
			example: 25,
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
