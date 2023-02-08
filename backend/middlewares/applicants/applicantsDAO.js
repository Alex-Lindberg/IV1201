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

module.exports = {
	applicantsDAO: {
		getApplicants,
	},
};
