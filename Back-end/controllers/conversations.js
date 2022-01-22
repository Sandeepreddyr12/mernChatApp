const mongoose = require('mongoose');

const Conversation = require('../models/conversations');



const createConversation = async (req,res,next) =>{
    const createdConversation = new Conversation({
        name : req.body.name,
        userId1 : req.body.id1,
        userId2 : req.body.id2
    })  

    const result = await createdConversation.save();
    res.json(result)
}

const getConversation = async (req, res) => {
    try {
      const conversation = await Conversation.find();
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }

exports.createConversation = createConversation;
exports.getConversation = getConversation;