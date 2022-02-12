const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
        name : {
            type : String, required : true
        },
        
        userId1 : String,
        profile1 : String,
        userId2 : String,
        profile2 : String,
        },
    { timestamps : true}
     ) 

module.exports = mongoose.model('Conversation',conversationSchema);