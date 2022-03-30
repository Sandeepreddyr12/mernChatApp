const mongoose = require('mongoose');

const Conversation = require('../models/conversations');
const Chat = require('../models/chats')
const HttpError = require('../models/http-error');




const createConversation = async (req,res,next) =>{
    const createdConversation = new Conversation({
        name : req.body.name,
        userId1 : req.body.id1,
        userId2 : req.body.id2,
        profile1 : req.body.profile1,
        profile2 : req.body.profile2,
    })  
    let result;
    try{
      result = await createdConversation.save();
    }catch (err) {
      const error = new HttpError(
        'Creating Conversation failed.',
        500
      );
      return next(error);
    }

    res.status(201).json(result)
}

//-------

const getConversation = async (req, res,next) => {
    try {
      const conversation = await Conversation.find({$or : [{userId1 : req.params.id},{userId2 : req.params.id}]});
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
      next(err)
    }
  }

const deleteConversation = async (req,res,next) => {
  
  let conversation;

  try{
     conversation = await Conversation.findById(req.params.id)
  }catch (err){
    res.status(500).json(err);
    next(err)
  }
  

  if(!conversation){
    const error = new HttpError(
      'finding Conversation failed.',
      500
    );
    return next(error);
  }


  try {
     await Chat.deleteMany({conversationId : req.params.id});
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
    return next(err)
  }


  try{
    await conversation.remove();
    res.status(200).json("deleted conversation");

  }catch (err){
    res.status(500).json(err);
    return next(err)
  }


  // used transactions, but failed

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await Chat.deleteMany([{conversationId : req.params.id}],{ session: sess });
  //   await conversation.remove({ session: sess });
  //   await sess.commitTransaction();
  //   // console.log("delete conversations")
  // } catch (err){
  //   res.status(500).json(err);
  //   return next(err)
  // }
  
  // if(res.headerSent){
  //   res.status(200).json("Deleted conversation");
  // }
  

} 

exports.createConversation = createConversation;
exports.getConversation = getConversation;
exports.deleteConversation = deleteConversation;