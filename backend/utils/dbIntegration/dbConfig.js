const { Pool } = require('pg');

const client = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
});

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

module.exports = { sendQuery, connect };
