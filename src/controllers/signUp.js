const queries = require('./queries');
const bcrypt = require('bcryptjs');

exports.post = (req, res) => {
  queries.checkUser(req.body.username)
    .then((resdata) => {
      const checked = resdata[0].case;
      return new Promise((resolve, reject) => {
        if(checked){
          reject();
        } else{
          resolve();
        }
      })
    })
    .then(() => {

      bcrypt.genSalt(10, (saltErr, salt) => {
      
        if (saltErr) {
          res.status(500).send('Internal server error, pronlem with generating salt');
        } else {
          bcrypt.hash(req.body.password, salt, (hashErr, hashedPw) => {
            if(hashErr) {
                res.status(500).send('Internal server error, pronlem with generating hashed password');
            } else {
              console.log(hashedPw);
            }
          })
        }
      })
    })
    .catch(() => {
       res.status(409).send('This user is already registered, please login');
    })
};
