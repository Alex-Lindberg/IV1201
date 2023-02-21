module.exports = {
	//just an example
	userId: {
		in: 'path',
		name: 'userId',
		schema: {
			type: 'string',
		},
		required: true,
	},
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
};
