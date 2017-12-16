const queries = require('./queries');

exports.get = (req, res, next) => {
  const { bookid } = req.params;
  queries.getSingleBook(bookid)
    .then((resData) => {
      const book = resData[0];
      res.render('singleBook', { book });
    })
    .catch(err => console.log(err))
};

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
//           queries.getSingleBook(bookid)
//             .then((resData) => {
//               const book = resData[0];
//               res.render('singleBook', { book });
//             })
//             .catch(err => console.log(err))
//           }
//       });
//     } else {
//   res.status(302).redirect('/');
// }
// }
