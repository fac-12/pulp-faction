const jwt = require('jsonwebtoken');
const { parse } = require('cookie');

exports.get = (req, res) => {
  if (req.headers.cookie) {
    const userJwt = parse(req.headers.cookie);
    jwt.verify(userJwt.token, secret, (err, decoded) => {
      if (err) {
        // res.writeHead(401);
        // res.end("Don't fuck with our cookies");
      } else {
        res.render('library');
      }
    });
  }

};
