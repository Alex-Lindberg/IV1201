const { sendQuery } = require('../../utils/dbIntegration/dbConfig');

const roleMap = {
	recruiter: 1,
	applicant: 2,
};

const registerApplicant = async (applicant) => {
	const query = `INSERT INTO person (name, surname, pnr, email, username, password, role_id) VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt('bf')), $7)`;
	try {
		const result = await sendQuery(query, [
			applicant.name,
			applicant.surname,
			applicant.pnr,
			applicant.email,
			applicant.username,
			applicant.password,
			roleMap.applicant,
		]);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	authDAO: {
		registerApplicant,
	},
};
