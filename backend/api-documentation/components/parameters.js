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
		description: 'A string to filter the applicants by',
		schema: {
			type: 'string',
			example: 'John',
		},
	},
	orderBy: {
		name: 'orderBy',
		in: 'query',
		description: 'A string to order the applicants by',
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
			enum: ['name', 'surname', 'pnr', 'email', 'username'],
			example: 'name',
		},
	},
	offset: {
		name: 'offset',
		in: 'query',
		description: 'The number of applicants to skip',
		schema: {
			type: 'integer',
			example: 0,
		},
	},
	size: {
		name: 'size',
		in: 'query',
		description: 'The number of applicants to return',
		schema: {
			type: 'integer',
			example: 25,
		},
	},
};
