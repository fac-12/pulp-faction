const db = require('../database/db_connections');

const checkUser = gitterhandle =>
  db.query(`
           SELECT
             CASE WHEN EXISTS(SELECT gitterhandle FROM users WHERE gitterhandle = $1)
             THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN)
           END
           `, [gitterhandle]);

const getPassword = gitterhandle =>
  db.query('SELECT password FROM users WHERE gitterhandle = $1', [gitterhandle]);

const getBooks = () =>
  db.query('SELECT * FROM books');

const getSingleBook = id =>
  db.query('SELECT * FROM books WHERE id = $1', [id]);

const createUser = (name, gitterhandle, hashedPw) => db.query('INSERT INTO users(name, gitterhandle, password) VALUES ($1, $2, $3) RETURNING id, gitterhandle, name', [name, gitterhandle, hashedPw]);

<<<<<<< HEAD
const addBook = (title, author, isbn, genre) =>
  db.query('INSERT INTO books(title, author, isbn, genre) VALUES ($1, $2, $3, $4)', [title, author, isbn, genre]);

=======
const reserveBook = bookId => db.query('UPDATE books SET reserved = NOT reserved WHERE id = $1', [bookId]);
>>>>>>> master

module.exports = {
  checkUser,
  createUser,
  getPassword,
  getBooks,
<<<<<<< HEAD
  addBook,
=======
  getSingleBook,
  reserveBook,
>>>>>>> master
};
