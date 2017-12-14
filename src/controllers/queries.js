const db = require('../database/db_connections');

const checkUser = gitterhandle => {
  return db.query('SELECT CASE WHEN EXISTS(SELECT gitterhandle FROM users WHERE gitterhandle = $1) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END', [gitterhandle])
};

const createUser = (name, gitterhandle, hashedPw) => {
  return db.query('INSERT INTO users(name, gitterhandle, password) VALUES ($1, $2, $3) RETURNING id, gitterhandle, name', [name, gitterhandle, hashedPw]);
};

module.exports = {
  checkUser,
  createUser,
}
