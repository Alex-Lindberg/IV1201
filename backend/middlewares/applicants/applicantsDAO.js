const { sendQuery } = require('../../utils/dbIntegration/dbConfig');
const {
	applicantId,
} = require('../../api-documentation/components/parameters');

const roleMap = {
	recruiter: 1,
	applicant: 2,
};

const getApplicants = async (filterString, orderBy, filterBy, offset, size) => {

	// const countQuery = `SELECT COUNT(*) FROM person WHERE role_id = $1
	// ${!!filterString ? `AND surname LIKE '%' || $2 || '%'` : ''}`;
	console.log('filterString', filterString);
	console.log('filterBy', filterBy);
	const query =
		!!filterString && !!filterBy ?
		`SELECT person_id, name, surname, pnr, email, username
	 		FROM person
	 		WHERE
	   	role_id = $1 AND
	   	surname LIKE '%' || $2 || '%'
		  ORDER BY surname ${orderBy ? orderBy : 'DESC'}`
			:
			`
		SELECT person_id, name, surname, pnr, email, username
	 		FROM person
	 		WHERE
	   	role_id = $1
	   	ORDER BY person_id ${orderBy ? orderBy : 'DESC'};
			`

	try {
		const queryParameters =
			!!filterString && !!filterBy
				? [roleMap.applicant, filterString]
				: [roleMap.applicant];
		// const countResult = await sendQuery(countQuery, queryParameters);
		const result = await sendQuery(query, queryParameters);
		const applicants = !size
			? result.rows
			: result.rows.slice(
					offset ? offset : 0,
					offset ? offset + size : 0 + size
			  );
		return {
			applicants: applicants,
			offset: offset,
			total_count: result.rowCount,
		};
	} catch (err) {
		throw err;
	}
};

const getApplicant = async (applicantId) => {
	const query = `SELECT person_id, name, surname, pnr, email, username FROM person WHERE person_id = $1 AND role_id = $2`;
	try {
		const result = await sendQuery(query, [applicantId, roleMap.applicant]);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

const getAvailabilityForApplicant = async (applicantId) => {
	const query = `SELECT from_date,to_date,availability_id FROM availability where person_id = $1`;
	try {
		const result = await sendQuery(query, [applicantId]);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

const getCompetenceForApplicant = async (applicantId) => {
	const query = `
		SELECT competence_profile.competence_id, years_of_experience,name 
		FROM competence_profile 
		JOIN competence c ON competence_profile.competence_id = c.competence_id 
		WHERE person_id = $1`;

	try {
		const result = await sendQuery(query, [applicantId]);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	applicantsDAO: {
		getApplicants,
		getApplicant,
		getAvailabilityForApplicant,
		getCompetenceForApplicant,
	},
};
