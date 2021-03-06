const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const conversations = require('./routes/conversations')
const chats = require('./routes/chats')
const profile = require('./routes/users')
const HttpError = require('./models/http-error')
// const {getFileStream} = require('./s3')


const app = express();

app.use(bodyparser.json());

// app.use('/uploads/images', express.static(path.join('uploads', 'images')));



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

  // app.get('/images/:key', async (req, res,next) => {
  //   const key = req.params.key
   
  //   try {
  //     const readStream =   getFileStream(key);
  //     readStream.pipe(res)
  //  } catch (err) {
  //    const error = new HttpError(
  //      'downloading image from s3 failed, please try again later.',
  //      500
  //    );
  //    return next(error);
  //  }
  // })

app.use('/profile', profile);
app.use('/chat', chats);
app.use('/', conversations);
app.use((req,res,next) =>{
const error = new HttpError("page not found", 404);
throw error
})


//error handler

app.use((err, req, res, next) =>{

  if (req.file) {
    fs.unlink(req.file.path, err => {
    })};
  

  if(res.headerSent){
    return next(err);
  }
  res.status(err.code || 500);
  res.json({message : err.message || "an unknown error occured"})
})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>{ console.log('node js connected')})

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w74mw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(()=>{console.log('mongodb connected')})
    .catch(() => {console.log('error while connecting database')})

    const io = require('socket.io')(server,{
      pingTimeout : 6000,
      cors : {
        origin : "*",
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

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });


  //send and get message
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiver);
    io.to(user?.socketId).emit("getMessage", data);
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});