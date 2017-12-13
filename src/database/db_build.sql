BEGIN;

DROP TABLE IF EXISTS users, books;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  gitterhandle VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  DateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(100) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  ownerID INT REFERENCES users(id) ON DELETE CASCADE,
  reserved BOOLEAN,
  DateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS borrowed (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  book_id INT REFERENCES books(id) ON DELETE CASCADE,
  DateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, gitterhandle, password) VALUES ('Sophie', '@sophielevens', '$2a$10$f9bHlm5g5AEg6cg/gcTMm.HTVYd9m2Kg2yPLpR9.JvWi8RFTOJm.i');

INSERT INTO books (title, author, isbn, genre, ownerID, reserved) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', '9781597226769', 'Novel', (SELECT id FROM users WHERE gitterhandle = '@sophielevens'), false);

COMMIT;
