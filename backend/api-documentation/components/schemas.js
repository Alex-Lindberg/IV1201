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
  Uuid: {
    type: 'string',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
  User: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'person_id', 'surname', 'pnr', 'email', 'username', 'password'],
    properties: {
      name: {
        type: 'string',
        example: 'John',
        minimum: 1,
        maximum: 255,
      },
      surname: {
        type: 'string',
        example: 'Doe',
        minimum: 1,
        maximum: 255,
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
        minimum: 1,
        maximum: 255,
      },
      password: {
        type: 'string',
        example: 'password',
        minimum: 1,
        maximum: 255,
      },
      person_id: {
        $ref: '#/components/schemas/GenericId',
      },
    },
  },

  SignUpData: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'surname', 'pnr', 'email', 'username', 'password'],
    properties: {
      name: {
        type: 'string',
        example: 'John',
        minimum: 1,
        maximum: 255,
      },
      surname: {
        type: 'string',
        example: 'Doe',
        minimum: 1,
        maximum: 255,
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
        minimum: 1,
        maximum: 255,
      },
      password: {
        type: 'string',
        example: 'password',
        minimum: 1,
        maximum: 255,
      },
    },
  },

  LoginData: {
    type: 'object',
    additionalProperties: false,
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
        example: 'johndoe',
        minimum: 1,
        maximum: 255,
      },
      password: {
        type: 'string',
        example: 'password',
        minimum: 1,
        maximum: 255,
      },
    },
  },

  Session: {
    type: 'object',
    additionalProperties: false,
    required: ['session_id', 'expiration_date'],
    properties: {
      session_id: {
        $ref: '#/components/schemas/Uuid',
      },
      person_id: {
        $ref: '#/components/schemas/GenericId',
      },
      expiration_date: {
        type: 'string',
      },
    },
  },
  UserAndSession: {
    type: 'object',
    additionalProperties: false,
    required: ['user', 'session'],
    properties: {
      user: {
        $ref: '#/components/schemas/User',
      },
      session: {
        $ref: '#/components/schemas/Session',
      },
    },
  },
};
