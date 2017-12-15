const queries = require('./queries');

exports.get = (req, res) => {
  const { bookid } = req.params;
  queries.reserveBook(bookid)
    .then(() => {
      res.status(302).send();
    })
    .catch((err) => console.log(err));
};
