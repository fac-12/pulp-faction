const router = require('express').Router();
const path = require('path');
const error = require('./error');
const home = require('./home');
const signUp = require('./signUp');
const login = require('./login');
const library = require('./library');
const addbook = require('./addbook');
// const id = require('./id');

router.get('/', home.get);

router.post('/login', login.post);
router.post('/signup', signUp.post);
router.post('/addbook', addbook.post);
router.get('/library', library.get);
// router.get('/library/:id', id.get);

router.use(error.client);

router.use(error.server);

module.exports = router;
