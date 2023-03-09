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

const encryptPasswords = async (client) => {
  client.query(
    `UPDATE public.person SET password = crypt('password', gen_salt('bf')) WHERE password IS NOT NULL`
  );
};

const connect = async () => {
  client.connect();
  await encryptPasswords(client);
};

const logChanges = (query, queryParameters) => {
  const queryLog = {
    query,
    queryParameters,
  };
  if (query.toUpperCase().includes('INSERT')) {
    queryLog.query = queryLog.query.replace('INSERT INTO', 'INSERTED INTO');
    console.log('queryLog', queryLog);
  }
  if (query.toUpperCase().includes('UPDATE')) {
    queryLog.query = queryLog.query.replace('UPDATE', 'UPDATED');
    console.log('queryLog', queryLog);
  }
  if (query.toUpperCase().includes('DELETE')) {
    queryLog.query = queryLog.query.replace('DELETE FROM', 'DELETED FROM');
    console.log('queryLog', queryLog);
  }
};

const sendQuery = async (query, queryParameters) => {
  try {
    await client.query('BEGIN');
    const result = await client.query(query, queryParameters);
    await client.query('COMMIT');
    logChanges(query, queryParameters);
    return result;
  } catch (error) {
    client.query('ROLLBACK');
    throw error;
  }
};
//queries is a list of objects with query and queryParameters
//

const sendCustomQuery = async (queries) => {
  await client.query('BEGIN');
  try {
    const results = Promise.all(
      queries.map(async ({ query, queryParameters }) => {
        return client.query(query, queryParameters);
      })
    );
    client.query('COMMIT');
    return results;
  } catch (error) {
    client.query('ROLLBACK');
    throw error;
  }
};

module.exports = { sendQuery, connect, sendCustomQuery };
