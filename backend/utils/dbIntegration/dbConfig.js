const { Pool } = require('pg');

const client = new Pool({
	connectionString: process.env.DATABASE_URL,
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
