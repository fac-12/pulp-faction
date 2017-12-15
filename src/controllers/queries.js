const db = require('../database/db_connections');

const checkUser = gitterhandle =>
  db.query('SELECT CASE WHEN EXISTS(SELECT gitterhandle FROM users WHERE gitterhandle = $1) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END', [gitterhandle]);

const getPassword = gitterhandle =>
  db.query('SELE password FROM users WHERE gitterhandle = $1', [gitterhandle]);

const getBooks = () =>
  db.query('SELECT * FROM books');

const getSingleBook = id =>
  db.query('SELECT * FROM books WHERE id = $1', [id]);

const createUser = (name, gitterhandle, hashedPw) => db.query('INSERT INTO users(name, gitterhandle, password) VALUES ($1, $2, $3) RETURNING id, gitterhandle, name', [name, gitterhandle, hashedPw]);

const reserveBook = bookId => db.query('UPDATE books SET reserved = NOT reserved WHERE id = $1', [bookId]);

module.exports = {
  checkUser,
  createUser,
  getPassword,
  getBooks,
  getSingleBook,
  reserveBook,
};
