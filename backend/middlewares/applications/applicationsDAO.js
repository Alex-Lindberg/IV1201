const { client } = require('../../utils/dbIntegration/dbConfig');

// const

const insertCompetenceProfile = async ({}, { years_of_experience, competence_id }, person_id) => {
  await sendSerializedQuery('BEGIN');
  const query = `INSERT INTO competence_profile (years_of_experience, competence_id, person_id) VALUES ($1, $2, $3) RETURNING competence_id, years_of_experience, competence_profile_id`;
  try {
    const result = await sendSerializedQuery(query, [
      years_of_experience,
      competence_id,
      person_id,
    ]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const insertAvailability = async ({ from_date, to_date }, person_id) => {
  const query = `INSERT INTO availability (from_date, to_date, person_id) VALUES ($1, $2, $3) RETURNING from_date, to_date, availability_id`;
  try {
    const result = await sendSerializedQuery(query, [from_date, to_date, person_id]);
    await sendSerializedQuery('COMMIT');
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  applicationsDAO: {
    insertCompetenceProfile,
    insertAvailability,
  },
};
