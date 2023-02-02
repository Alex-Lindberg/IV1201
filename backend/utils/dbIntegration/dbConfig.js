const { Pool } = require("pg");
const client = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: "0.0.0.0",
  database: process.env.POSTGRES_DB || "postgres",
  port: process.env.POSTGRES_PORT || 5432,
});

const sendQuery = async (query) => {
  try {
    return await client.query(query);
  } catch (error) {
    throw error;
  }
};

const connect = async () => {
  console.log(
    `🚮 | file: db.js:26 | connect | process.env.POSTGRES_DB`,
    process.env.POSTGRES_DB
  );
  console.log(
    `🚮 | file: db.js:26 | connect | process.env.POSTGRES_PASSWORD`,
    process.env.POSTGRES_PASSWORD
  );
  console.log(
    `🚮 | file: db.js:26 | connect | process.env.POSTGRES_USER`,
    process.env.POSTGRES_USER
  );
  console.log(
    `🚮 | file: db.js:24 | connect | process.env.POSTGRES_PORT`,
    process.env.POSTGRES_PORT
  );
  console.log(
    `🚮 | file: db.js:23 | connect | process.env.BACKEND_PORT`,
    process.env.BACKEND_PORT
  );
  return await client.connect();
};

module.exports = { sendQuery, connect };
