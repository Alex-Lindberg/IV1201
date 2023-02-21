const { sendQuery } = require('../../utils/dbIntegration/dbConfig');

const roleMap = {
	recruiter: 1,
	applicant: 2,
};

const getApplicants = async () => {
	const query = `SELECT person_id, name, surname, pnr, email, username FROM person WHERE role_id = ${roleMap.applicant}`;
	try {
		const result = await sendQuery(query);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

const getApplicant = async (applicantId) => {
	const query = `SELECT person_id, name, surname, pnr, email, username FROM person WHERE person_id = ${applicantId} AND role_id = ${roleMap.applicant}`;
	try {
		const result = await sendQuery(query);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

const getAvailabilityForApplicant = async (applicantId) => {
	const query = `SELECT from_date,to_date,availability_id FROM availability where person_id = ${applicantId}`;
	try {
		const result = await sendQuery(query);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

const getCompetenceForApplicant = async (applicantId) => {
	const query = `SELECT competence_profile.competence_id, years_of_experience,name FROM competence_profile JOIN competence c on competence_profile.competence_id = c.competence_id WHERE person_id = ${applicantId}`;
	try {
		const result = await sendQuery(query);
		return result.rows[0];
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
