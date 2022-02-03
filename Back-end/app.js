const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const conversations = require('./routes/conversations')
const chats = require('./routes/chats')
const profile = require('./routes/users')
const HttpError = require('./models/http-error')


const app = express();

app.use(bodyparser.json());


//cors handler
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });  



  // routes

app.use('/profile', profile);
app.use('/chat', chats);
app.use('/', conversations);
app.use((req,res,next) =>{
const error = new HttpError("page not found", 404);
throw error
})


//error handler

app.use((err, req, res, next) =>{
  if(res.headerSent){
    return next(err);
  }
  res.status(err.code || 500);
  res.json({message : err.message || "an unknown error occured"})
})


const server = app.listen(5000, () =>{ console.log('node js connected')})

mongoose
    .connect('mongodb+srv://sandyman:sandyman123@cluster0.w74mw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(()=>{console.log('mongodb connected')})
    .catch(() => {console.log('error while connecting database')})

    const io = require('socket.io')(server,{
      pingTimeout : 6000,
      cors : {
        origin : "http://localhost:3000",
      },
    });

    io.on("connection", (socket) => {
      console.log("Connected to socket.io");
      socket.on("setup", (userData) => {
        socket.join(userData.id);
        // console.log(userData,"✨🎉")
        socket.emit("connected");
      });
    
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });
      
    
      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved;
    
        if (!chat.receiverId) return console.log("chat.users not defined");
    
          // if (chat.senderId == newMessageRecieved.sender._id) return;
    
          socket.in(chat.receiverId).emit("message recieved", newMessageRecieved);
      });
    
      socket.off("setup", () => {
        socket.leave(userData._id);
        console.log("USER DISCONNECTED");
      });
    });
    