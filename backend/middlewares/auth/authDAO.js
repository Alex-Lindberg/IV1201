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

const getUser = async (username, password = null) => {
  const query = password
    ? `SELECT person_id, name, surname, pnr, email, username, role_id FROM person WHERE username = $1 AND password = crypt($2, password)`
    : `SELECT person_id, name, surname, pnr, email, username, role_id FROM person WHERE username = $1`;
  const queryParams = password ? [username, password] : [username];
  try {
    const result = await sendQuery(query, queryParams);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const getSession = async (person_id, session_id = null) => {
  const queryParameters = session_id ? [person_id, session_id] : [person_id];
  const query = session_id
    ? `SELECT session_id, person_id, expiration_date FROM sessions WHERE person_id = $1 AND session_id = $2`
    : `SELECT session_id, person_id, expiration_date FROM sessions WHERE person_id = $1`;
  try {
    const result = await sendQuery(query, queryParameters);
    return result.rows;
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

const deleteSession = async (session_id) => {
  const query = `DELETE FROM sessions WHERE session_id = $1`;
  try {
    await sendQuery(query, [session_id]);
  } catch (err) {
    throw err;
  }
};
const checkIfUserExists = async (username) => {
  const query = `SELECT person_id FROM person WHERE username = $1`;
  try {
    const result = await sendQuery(query, [username]);
    return !!result.rows[0];
  } catch (err) {
    throw err;
  }
};

const refreshSession = async (person_id) => {
  const query = `UPDATE sessions SET expiration_date = NOW() + INTERVAL '30 day' WHERE person_id = $1`;
  try {
    await sendQuery(query, [person_id]);
  } catch (err) {
    throw err;
  }
};

const getRole = async (person_id) => {
  const query = `SELECT role_id FROM person WHERE person_id = $1`;
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
    getSession,
    getUser,
    deleteSession,
    checkIfUserExists,
    refreshSession,
    getRole,
  },
};
