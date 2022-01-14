const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const conversations = require('./routes/conversations')
const chats = require('./routes/chats')

const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });  

app.use('/chat', chats);
app.use('/', conversations);

mongoose
    .connect('mongodb+srv://sandyman:sandyman123@cluster0.w74mw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(()=>{
        app.listen(5000)
        console.log('mongodb connected')})
    .catch(() => {console.log('error while connecting database')})

