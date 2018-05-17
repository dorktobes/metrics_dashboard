const initOptions = {
  query(e) {
    console.log(`EXECUTING ${e.query}`);
  },
  connect(client) {
    const cp = client.connectionParameters;
    console.log('Connected to database:', cp.database);
  },
};
const pgp = require('pg-promise')(initOptions);

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'metrics_dashboard',
});

module.exports = db;
