const jwt = require('jsonwebtoken');
const { parse } = require('cookie');

exports.get = (req, res) => {
  res.render('library');
};
