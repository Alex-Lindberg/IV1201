const { Pool } = require('pg');

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const sendQuery = async (query) => {
  try {
    const res = await client.query(query);
    return res;
  } catch (error) {
    throw error;
  }
};

const connect = async () => {
  return await client.connect();
};

module.exports = { sendQuery, connect };
