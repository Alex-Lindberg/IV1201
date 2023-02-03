const { Pool } = require('pg');
const fs = require('fs');

const client = new Pool({
	connectionString: process.env.DATABASE_URL,
});
const dbCreator = fs
	.readFileSync('utils/dbIntegration/sqlScripts/old-database.sql')
	.toString();

const createDatabase = async () => {
	try {
		await client.query('BEGIN');
		await client.query(dbCreator);
		await client.query('COMMIT');
	} catch (error) {
		await client.query('ROLLBACK');
		throw error;
	}
};

const connect = async () => {
	client.connect();
};

const sendQuery = async (query) => {
	try {
		return await client.query(query);
	} catch (error) {
		throw error;
	}
};

// check if database "IV1012" exists, if it doesn't, create it
sendQuery(`SELECT * FROM pg_database WHERE datname = 'iv1201'`)
	.then((res) => {
		if (res.rowCount === 0) {
			createDatabase();
		}
	})
	.catch((error) => {
		console.log(error);
	});

module.exports = { sendQuery, connect };
