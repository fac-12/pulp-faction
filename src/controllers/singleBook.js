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
