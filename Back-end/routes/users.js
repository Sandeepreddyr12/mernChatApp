const express = require('express');
const { check } = require('express-validator');


const Users = require('../controllers/users');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth')


const router = express.Router();



router.post(
  '/signup',
  fileUpload.single('image'),
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
    
    router.use(checkAuth)
    
    router.patch('/:id', 
    fileUpload.single('image'),
    [
      check('name')
        .not()
        .isEmpty(),
      ],
      Users.updateUser
      );
      

    router.get('/:id', Users.getUsers);

    

    module.exports = router;
