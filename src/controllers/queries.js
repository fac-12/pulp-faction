const db = require('../database/db_connections');

const checkUser = gitterhandle =>
  db.query('SELECT CASE WHEN EXISTS(SELECT gitterhandle FROM users WHERE gitterhandle = $1) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END', [gitterhandle]);

const getPassword = gitterhandle =>
  db.query('SELECT password FROM users WHERE gitterhandle = $1', [gitterhandle]);


module.exports = {
  checkUser,
  getPassword,
};
