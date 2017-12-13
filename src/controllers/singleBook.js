exports.get = (req, res, next) => {
    const { singleBook } = req.params;
    if (library.includes(singleBook)) {
      return res.render('singleBook', { singleBook });
    }