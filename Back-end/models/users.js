const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
});

// userSchema.plugin(uniqueValidator);

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true, minlength: 6 },
//   image: { type: String, required: true },
//   conversations : [{type : mongoose.Types.ObjectId, required : true, ref : 'Conversation'}]
// });

module.exports = mongoose.model('User', userSchema);
