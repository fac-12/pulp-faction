const jwt = require('jsonwebtoken');
const {
  parse
} = require('cookie');

exports.get = (req, res) => {
  if (req.headers.cookie) {
    const userJwt = parse(req.headers.cookie);
    jwt.verify(userJwt.token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send("Don't fuck with our cookies");
      } else {
        res.render('library');
      }
    });
  } else {
    res.status(302).redirect('/');
  }
}
