const { client } = require('../../utils/dbIntegration/dbConfig');

const insertApplication = async (person_id, availabilities, competences) => {
  const availabilityQuery = `INSERT INTO availability (from_date, to_date, person_id) VALUES ($1, $2, $3) RETURNING from_date, to_date, availability_id`;
  const competenceQuery = `INSERT INTO competence_profile (years_of_experience, competence_id, person_id) VALUES ($1, $2, $3) RETURNING competence_id, years_of_experience, competence_profile_id`;
  try {
    await client.query('BEGIN');
    const availabilityResults = await Promise.all(
      availabilities.map(async (availability) => {
        const result = await client.query(availabilityQuery, [
          availability.from_date,
          availability.to_date,
          person_id,
        ]);
        return result.rows[0];
      })
    );
    const competenceResults = await Promise.all(
      competences.map(async (competence) => {
        const result = await client.query(competenceQuery, [
          competence.years_of_experience,
          competence.competence_id,
          person_id,
        ]);
        return result.rows[0];
      })
    );
    await client.query('COMMIT');
    return {
      availabilities: availabilityResults,
      competences: competenceResults,
    };
  } catch (err) {
    client.query('ROLLBACK');
    throw err;
  }
};

module.exports = {
  applicationsDAO: {
    insertApplication,
  },
};
