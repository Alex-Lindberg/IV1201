const { Pool } = require("pg");
const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const sendQuery = async (query) => {
  try {
    return await client.query(query);
  } catch (error) {
    throw error;
  }
};

const connect = async () => {
  console.log(`DATABASE_URL`, process.env.DATABASE_URL);
  console.log("POSTGRES_DB", process.env.POSTGRES_DB);
  return await client.connect();
};

module.exports = { sendQuery, connect };
