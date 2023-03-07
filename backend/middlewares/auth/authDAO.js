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

const getUser = async (username, password) => {
  const query = `SELECT person_id, name, surname, pnr, email, username, role_id FROM person WHERE username = $1 AND password = crypt($2, password)`;
  try {
    const result = await sendQuery(query, [username, password]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const getSession = async (session_id, person_id) => {
  const query = `SELECT session_id, person_id, expiration_date FROM sessions WHERE session_id = $1 AND person_id = $2`;
  try {
    const result = await sendQuery(query, [session_id, person_id]);
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
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const refreshSession = async (session_id) => {
  const query = `UPDATE sessions SET expiration_date = NOW() + INTERVAL '30 day' WHERE session_id = $1`;
  try {
    await sendQuery(query, [session_id]);
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
  },
};