const express = require('express');
const { check } = require('express-validator');

const Users = require('../controllers/users');

const router = express.Router();

router.get('/', Users.getUsers);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  Users.signup
);

router.post('/login', Users.login);

module.exports = router;
