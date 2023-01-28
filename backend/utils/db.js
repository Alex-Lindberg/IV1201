const { Pool } = require('pg');
const client = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
});

const sendQuery = async (query) => {
  try {
    const res = await client.query(query);
    return res;
  } catch (error) {
    throw error;
  }
};

const connect = async () => await client.connect();

module.exports = { sendQuery, connect };
