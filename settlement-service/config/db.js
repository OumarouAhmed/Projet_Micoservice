const { Pool } = require('pg');

const pool = new Pool({
  user: 'bank_user',
  host: 'localhost',
  database: 'interbank_banks',
  password: 'bankpass',
  port: 5432
});

module.exports = pool;
