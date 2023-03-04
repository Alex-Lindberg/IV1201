const { sendQuery } = require('../../utils/dbIntegration/dbConfig');

const roleMap = {
	recruiter: 1,
	applicant: 2,
};

const createUser = async (applicant) => {
	const query = `INSERT INTO person (name, surname, pnr, email, username, password, role_id) VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt('bf')), $7) RETURNING name, surname, pnr, email, username, role_id, person_id`;
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
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

const createSession = async (person_id) => {
	const query = `INSERT INTO sessions (person_id, expiration_date) VALUES ($1, NOW() + INTERVAL '30 day') RETURNING session_id, expiration_date`;
	try {
		const result = await sendQuery(query, [person_id]);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

module.exports = {
	authDAO: {
		createUser,
		createSession,
	},
};
