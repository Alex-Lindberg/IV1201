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

const sendSerializedQuery = async (query, queryParameters = null) => {
  try {
    if (!queryParameters) {
      return await client.query(query);
    }
    return await client.query(query, queryParameters);
  } catch (error) {
    client.query('ROLLBACK');
    throw error;
  }
};

module.exports = { sendQuery, connect, sendSerializedQuery, client };
