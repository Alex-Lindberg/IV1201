const { Pool } = require('pg');
const client = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'localhost',
  database: process.env.POSTGRES_DB || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
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
  console.log('🚀 ~ file: db.js:9 ~ process.env.POSTGRES_USER', process.env.POSTGRES_USER);
  console.log('🚀 ~ file: db.js:9 ~ process.env.POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
  console.log('🚀 ~ file: db.js:9 ~ process.env.POSTGRES_DB', process.env.POSTGRES_DB);
  console.log('🚀 ~ file: db.js:9 ~ process.env.POSTGRES_PORT', process.env.POSTGRES_PORT);
  return await client.connect();
};

module.exports = { sendQuery, connect };
