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
	SocialSecurityNumber: {
		type: 'string',
		pattern: '^[0-9]{8}-[0-9]{4}$',
		example: '19900101-1234',
	},
	GenericId: {
		type: 'integer',
		example: 1,
		minimum: 1,
	},
	Email: {
		type: 'string',
		format: 'email',
		example: 'denhad@kth.se',
	},
	Applicant: {
		type: 'object',
		additionalProperties: false,
		required: ['person_id', 'name', 'surname', 'pnr', 'email', 'username'],
		properties: {
			person_id: {
				$ref: '#/components/schemas/GenericId',
			},
			name: {
				type: 'string',
				example: 'John',
			},
			surname: {
				type: 'string',
				example: 'Doe',
			},
			pnr: {
				$ref: '#/components/schemas/SocialSecurityNumber',
			},
			email: {
				$ref: '#/components/schemas/Email',
			},
			username: {
				type: 'string',
				example: 'johndoe',
				nullable: true,
			},
		},
	},
	ListOfApplicants: {
		type: 'array',
		items: {
			$ref: '#/components/schemas/Applicant',
		},
	},
};
