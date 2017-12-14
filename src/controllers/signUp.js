const queries = require('./queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;


exports.post = (req, res) => {
  const signupForm = req.body;
  queries.checkUser(signupForm.gitterhandle)
    .then((resdata) => {

      const alreadyExists = resdata[0].case;

      return new Promise((resolve, reject) => {
        if(alreadyExists){
          reject(new Error('This user already exists, please login'));
        }else{
          resolve();
        }
      })
    })
    .then(() => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(signupForm.password, salt);
        return hash;
    })
    .then((hashedPw) => {
      return queries.createUser(signupForm.name, signupForm.gitterhandle, hashedPw)
    })
    .then(() => {
      const token = jwt.sign({ username: signupForm.gitterhandle, logged_in: true }, secret);
      res.status(201).set({ Location: '/library', 'Set-Cookie': `token=${token}; HttpOnly; Max-Age=9000` });
      res.send();
    })

  .catch((err) => {
    switch (err.message) {
      case 'This user already exists, please login':
        res.status(409).send('This user is already registered, please login');
        break;
      default: console.log(err);
    }

       // res.status(500).send('Internal server error, pronlem with generating salt');
       // res.status(500).send('Internal server error, pronlem with generating hashed password');
    })
};
