const { Pool } = require('pg');

//URL from Elephant SQL
const PG_URI = 'postgres://ttvqqiun:y4t-aYUkcf5yKzAYNPWa1q05nKG-yLEo@kashin.db.elephantsql.com/ttvqqiun';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

//CREATE TABLE todo(
//   _id SERIAL PRIMARY KEY,
//   username VARCHAR NOT NULL,
//   password VARCHAR NOT NULL,
//);

//CREATE TABLE todo(
//   _id SERIAL PRIMARY KEY,
//   task VARCHAR NOT NULL,
//   completed BOOLEAN NOT NULL,
//   userid INT NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// );

//INSERT INTO todo(
//   task,
//   status,
//   userid
// ) VALUES (
//   'Take out garbage',
//   false,
//   1
// );

//SELECT todo.*, users.username
//FROM todo
//LEFT JOIN users
//ON todo.userid=users.id
//WHERE userid=1;