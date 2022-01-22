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

    let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};


    io.on("connection",(socket)=>{
      console.log(" socket io connected")
      io.emit("message", "hi im from servers");

      
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
    });


    console.log(users,"🎇🎆");