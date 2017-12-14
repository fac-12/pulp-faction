const bcrypt = require('bcryptjs');
const queries = require('./queries');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;


exports.post = (req, res) => {
  queries.getPassword(req.body.username)
    .then(resData =>
      new Promise((resolve, reject) => {
        if (resData.length > 0) {
          const password = resData[0].password;
          resolve(password);
        }
        else reject(new Error('Username doesn\'t exist'));
      })
    )
    .then((hashPassword) => {
      const match = bcrypt.compareSync(req.body.password, hashPassword);
      if (match) {
        const token = jwt.sign({ username: req.body.username, logged_in: true }, secret);
        res.status(302).set({ Location: '/', 'Set-Cookie': `token=${token}; HttpOnly; Max-Age=9000` });
        res.send();
      } else {
        res.status(401).send('Your password is incorrect');
      }
    })
    .catch((err) => console.log(err));
};
