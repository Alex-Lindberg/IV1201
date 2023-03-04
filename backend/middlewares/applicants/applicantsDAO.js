const { sendQuery } = require('../../utils/dbIntegration/dbConfig');

const roleMap = {
	recruiter: 1,
	applicant: 2,
};

// TODO: check if i can send it as a string without the need of sending the parameters
// TODO: do i need to implement a case where there is no parameters to send?

const getApplicants = async () => {
	const query = `SELECT person_id, name, surname, pnr, email, username FROM person WHERE role_id = $1`;
	try {
		const result = await sendQuery(query, [roleMap.applicant]);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

const getApplicant = async (applicantId) => {
	console.log('getApplicant');
	const query = `SELECT person_id, name, surname, pnr, email, username FROM person WHERE person_id = ${applicantId} AND role_id = $1`;
	try {
		const result = await sendQuery(query, [roleMap.applicant]);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

const getAvailabilityForApplicant = async (applicantId) => {
	console.log('getAvailabilityForApplicant');
	const query = `SELECT from_date,to_date,availability_id FROM availability where person_id = $1`;
	try {
		const result = await sendQuery(query, [applicantId]);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

const getCompetenceForApplicant = async (applicantId) => {
	console.log('getCompetenceForApplicant');
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
