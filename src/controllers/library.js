const jwt = require('jsonwebtoken');
const {
  parse
} = require('cookie');
const queries = require('./queries');

exports.get = (req, res, next) => {

  if (req.headers.cookie) {
    const userJwt = parse(req.headers.cookie);
    jwt.verify(userJwt.token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send("Don't fuck with our cookies");
      } else {
        queries.getBooks()
        .then((books)=>{
          console.log(books);
          res.render('library', { books });

        })
        .catch((err)=> {
          console.log(err);
        })

      }
    });
  } else {
    res.status(302).redirect('/');
  }
}
