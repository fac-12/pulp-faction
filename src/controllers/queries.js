const db = require('../database/db_connections');

const checkUser = gitterhandle => {
  console.log(gitterhandle);
  return db.query(`SELECT CASE WHEN EXISTS(SELECT gitterhandle FROM users WHERE gitterhandle = $1) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END`, [gitterhandle])
};


module.exports = {
  checkUser,
}
