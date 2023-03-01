module.exports = {
	ErrorCode: {
		type: 'object',
		additionalProperties: false,
		required: ['statusCode', 'error', 'method', 'path', 'message'],
		properties: {
			statusCode: {
				type: 'integer',
				example: 400,
			},
			error: {
				type: 'string',
				example: 'Invalid value',
			},
			method: {
				type: 'string',
				example: 'GET',
			},
			path: {
				type: 'string',
				example: '/api/applicants',
			},
			message: {
				type: 'string',
				example: 'Invalid value',
			},
		},
	},
	ListOfErrorCodes: {
		type: 'array',
		items: {
			$ref: '#/components/schemas/ErrorCode',
		},
	},
	PersonalNumber: {
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
	Competence: {
		type: 'object',
		additionalProperties: false,
		required: ['competence_id', 'name', 'years_of_experience'],
		properties: {
			competence_id: {
				$ref: '#/components/schemas/GenericId',
			},
			name: {
				type: 'string',
				example: 'Java',
			},
			years_of_experience: {
				type: 'number',
				format: 'float',
				example: 3.5,
			},
		},
	},
	GenericDate: {
		type: 'string',
		format: 'date',
		example: '2020-01-01',
	},
	Availability: {
		type: 'object',
		additionalProperties: false,
		required: ['availability_id', 'from_date', 'to_date'],
		properties: {
			availability_id: {
				$ref: '#/components/schemas/GenericId',
			},
			from_date: {
				$ref: '#/components/schemas/GenericDate',
			},
			to_date: {
				$ref: '#/components/schemas/GenericDate',
			},
		},
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
				$ref: '#/components/schemas/PersonalNumber',
			},
			email: {
				$ref: '#/components/schemas/Email',
			},
			username: {
				type: 'string',
				example: 'johndoe',
				nullable: true,
			},
			competence: {
				$ref: '#/components/schemas/Competence',
			},
			availability: {
				$ref: '#/components/schemas/Availability',
			},
		},
	},
	ListOfApplicants: {
		type: 'array',
		items: {
			$ref: '#/components/schemas/Applicant',
		},
	},
	SignUp: {
		type: 'object',
		additionalProperties: false,
		required: ['name', 'surname', 'pnr', 'email', 'username', 'password'],
		properties: {
			name: {
				type: 'string',
				example: 'John',
			},
			surname: {
				type: 'string',
				example: 'Doe',
			},
			pnr: {
				$ref: '#/components/schemas/PersonalNumber',
			},
			email: {
				$ref: '#/components/schemas/Email',
			},
			username: {
				type: 'string',
				example: 'johndoe',
			},
			password: {
				type: 'string',
				example: 'password',
			},
		},
	},
};
