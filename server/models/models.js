const { Pool } = require('pg');
// require('dotenv').config();

const PG_URI = 'postgres://ttvqqiun:y4t-aYUkcf5yKzAYNPWa1q05nKG-yLEo@kashin.db.elephantsql.com/ttvqqiun';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};