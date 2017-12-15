const bcrypt = require('bcryptjs');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;


exports.post = (req, res) => {
  console.log('Login route');
  queries.getPassword(req.body.username)
    .then(resData =>
      new Promise((resolve, reject) => {
        console.log('get password from database');
        if (resData.length > 0) {
          const { password } = resData[0];
          resolve(password);
        } else reject(new Error('Username doesn\'t exist'));
      }),
    )
    .then((hashPassword) => {
      console.log('Hash password');
      const match = bcrypt.compareSync(req.body.password, hashPassword);
      if (match) {
        const token = jwt.sign({ username: req.body.username, logged_in: true }, secret);
        res.status(201).set({ Location: '/library', 'Set-Cookie': `token=${token}; HttpOnly; Max-Age=9000` });
        res.send();
      } else {
        res.status(401).send('Your password is incorrect');
      }
    })
    .catch((err) => {
      switch (err.message) {
        case 'Username doesn\'t exist':
          res.status(401).send('Username doesn\'t exist');
          break;
        default:
          console.log(err);
      }
    });
};
