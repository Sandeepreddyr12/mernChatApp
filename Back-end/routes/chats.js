const express = require('express');

const chats = require('../controllers/chats')
// const checkAuth = require('../middleware/check-auth')


const router = express.Router();

// router.use(checkAuth)

router.get('/:id',chats.getChat)

router.post('/',chats.createChat)

module.exports = router;