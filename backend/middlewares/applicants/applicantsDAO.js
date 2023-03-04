const { sendQuery } = require('../../utils/dbIntegration/dbConfig');

const roleMap = {
	recruiter: 1,
	applicant: 2,
};

const getApplicants = async (filterString, orderBy, filterBy, offset, size) => {
	const query = `
      SELECT person_id, name, surname, pnr, email, username
      FROM person
      WHERE 
        role_id = $1 AND
        surname LIKE '%' || $2 || '%'
        ORDER BY $3, $4
        LIMIT $5
        OFFSET $6`;
	try {
		const result = await sendQuery(query, [
			roleMap.applicant,
			filterString,
			filterBy,
			orderBy,
			size,
			offset,
		]);
		return result.rows;
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
