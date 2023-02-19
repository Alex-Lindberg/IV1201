const { Pool } = require('pg');

let client;
if (process.env.NODE_ENV !== 'development') {
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
// temp logs to be removed later
console.log('host', process.env.POSTGRES_HOST);
console.log('user', process.env.POSTGRES_USER);
console.log('password', process.env.POSTGRES_PASSWORD);
console.log('database', process.env.POSTGRES_DB);
console.log('socketPath', process.env.POSTGRES_SOCKET_PATH);
console.log('port', process.env.POSTGRES_PORT);

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
