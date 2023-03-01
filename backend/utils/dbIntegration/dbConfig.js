const { Pool } = require('pg');

let client;
if (process.env.NODE_ENV === 'development') {
	console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
	client = new Pool({
		connectionString: process.env.DATABASE_URL,
	});
} else {
	client = new Pool({
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		socketPath: process.env.POSTGRES_SOCKET_PATH,
		port: process.env.POSTGRES_PORT,
	});
}

const connect = async () => {
	client.connect();
};

const sendQuery = async (query, queryParameters) => {
	try {
		console.log('query', query);
		await client.query('BEGIN');
		const result = await client.query(query, ...queryParameters);
		await client.query('COMMIT');
		return result;
	} catch (error) {
		client.query('ROLLBACK');
		throw error;
	}
};

module.exports = { sendQuery, connect };
