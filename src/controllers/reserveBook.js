const queries = require('./queries');

exports.get = (req, res) => {
  const { bookid } = req.params;
  queries.reserveBook(bookid)
    .then(() => {
      res.status(302).send();
    })
    .catch((err) => console.log(err));
};

//protect routes - issue #25, also see #20 
//
// exports.get = (req, res, next) => {
// //check cookie
//     if (req.headers.cookie) {
//       const userJwt = parse(req.headers.cookie);
//       jwt.verify(userJwt.token, process.env.SECRET, (err, decoded) => {
//         if (err) {
//           res.status(401).send("Don't fuck with our cookies");
//         } else {
//
//           const { bookid } = req.params;
//           queries.reserveBook(bookid)
//             .then(() => {
//               res.status(302).send();
//             })
//             .catch((err) => console.log(err));
//           }
//       });
//     } else {
//   res.status(302).redirect('/');
// }
// }
