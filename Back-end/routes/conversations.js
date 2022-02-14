const express = require('express');


const conversations = require('../controllers/conversations');
const checkAuth = require('../middleware/check-auth')



const router = express.Router();

router.use(checkAuth)

router.get('/:id',conversations.getConversation)

router.post('/',conversations.createConversation)

router.delete('/:id',conversations.deleteConversation)


module.exports = router;