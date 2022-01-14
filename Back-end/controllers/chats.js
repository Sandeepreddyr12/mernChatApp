const mongoose = require('mongoose');

const Chat = require('../models/chats')


const createChat = async (req, res, next ) => {
    const createdChat = new Chat({
        conversationId : req.body.id,
        sender : req.body.sender,
        message : req.body.message
    })

    const result = await createdChat.save();
    res.json(result)
}


const getChat = async (req, res) =>{
    try{
    const chat = await Chat.find({conversationId : req.params.id });
    res.status(200).json(chat);
    } catch(err){
        res.status(500).json(err)
    }
}

exports.createChat = createChat;
exports.getChat = getChat;
