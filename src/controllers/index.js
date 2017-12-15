const router = require('express').Router();
const path = require('path');
const error = require('./error');
const home = require('./home');
const singleBook = require('./singleBook');
const signUp = require('./signUp');
const login = require('./login');
const library = require('./library');
const reserveBook = require('./reserveBook');

router.get('/', home.get);

router.post('/login', login.post);
router.post('/signup', signUp.post);
router.get('/library', library.get);
router.get('/library/:bookid', singleBook.get);
router.get('/reservebook/:bookid', reserveBook.get);


router.use(error.client);
router.use(error.server);

module.exports = router;
