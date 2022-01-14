const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
        name : {
            type : String, required : true
        },
        
        userid : String
        },
    { timestamps : true}
     ) 

module.exports = mongoose.model('Conversation',conversationSchema);