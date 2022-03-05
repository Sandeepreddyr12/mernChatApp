const mongoose = require('mongoose');

const Chat = require('../models/chats');
const HttpError = require('../models/http-error');



const createChat = async (req, res, next ) => {
    const createdChat = new Chat({
        conversationId : req.body.id,
        sender : req.body.sender,
        receiver : req.body.receiver,
        message : req.body.message
    })
    let result;
    try{
        result = await createdChat.save();
    }catch (err) {
        const error = new HttpError(
          'sending message failed.',
          500
        );
        return next(error);
      }
   
    res.status(201).json(result)
}


const getChat = async (req, res,next) =>{
    let chat;
    try{
    chat = await Chat.find({conversationId : req.params.id });
    } catch (err) {
    const error = new HttpError(
      'getting chats failed.',
      500
    );
    return next(error);
  }

  res.status(200).json(chat);
}

exports.createChat = createChat;
exports.getChat = getChat;
