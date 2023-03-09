const { sendCustomQuery } = require('../../utils/dbIntegration/dbConfig');
const beginQuery = async () => {
  try {
    return await sendCustomQuery('BEGIN');
  } catch (err) {
    throw err;
  }
};
const commitQuery = async () => {
  try {
    return await sendCustomQuery('COMMIT');
  } catch (err) {
    throw err;
  }
};
const insertCompetenceProfile = async ({ years_of_experience, competence_id }, person_id) => {
  const query = `INSERT INTO competence_profile (years_of_experience, competence_id, person_id) VALUES ($1, $2, $3) RETURNING competence_id, years_of_experience, competence_profile_id`;
  try {
    const result = await sendCustomQuery(query, [years_of_experience, competence_id, person_id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const insertAvailability = async ({ from_date, to_date }, person_id) => {
  const query = `INSERT INTO availability (from_date, to_date, person_id) VALUES ($1, $2, $3) RETURNING from_date, to_date, availability_id`;
  try {
    const result = await sendCustomQuery(query, [from_date, to_date, person_id]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  applicationsDAO: {
    insertCompetenceProfile,
    insertAvailability,
    beginQuery,
    commitQuery,
  },
};
