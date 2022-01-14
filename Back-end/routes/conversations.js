const express = require('express');


const conversations = require('../controllers/conversations')


const router = express.Router();


router.get('/',conversations.getConversation)

router.post('/',conversations.createConversation)

module.exports = router;