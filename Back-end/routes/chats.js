const express = require('express');

const chats = require('../controllers/chats')


const router = express.Router();


router.get('/:id',chats.getChat)

router.post('/',chats.createChat)

module.exports = router;