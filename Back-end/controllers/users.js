const fs = require('fs');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const HttpError = require('../models/http-error');
const User = require('../models/users');
const {uploadFile,deleteFile} = require('../s3');


//-----------get users--------------



const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({ _id: { $not: { $eq: req.params.id} } }, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(200).json({ users: users.map(user => user.toObject({ getters: true })) });
};



//--------------- get user------

const getUser = async (req, res, next) => {
  let users;
  try {
    users = await User.findById({_id : req.params.id} , '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching user failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(200).json(users);
};


//----------sign up-----



const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  let awsS3File;

  try {
     awsS3File = await uploadFile(req.file)
  } catch (err) {
    const error = new HttpError(
      'uploading image to s3 failed, please try again later.',
      500
    );
    return next(error);
  }

 

  const createdUser = new User({
    name,
    email,
    image: awsS3File.key,
    password : hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

    res
    .status(201)
    .json({ userId: createdUser.id,name : createdUser.name, profile : createdUser.image, email: createdUser.email, token: token });
  };


  //-----------------login ----------------



const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    name : existingUser.name,
    profile : existingUser.image,
    token: token
  });
};



// ------updating user //patch request--------



const updateUser = async (req, res, next) => {


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name } = req.body;

  let userId = req.params.id;
  let existingUser;

  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Updating user failed, please try again later.,findbyid',
      500
    );
    return next(error);
  }


  const imagePath = existingUser.image


  
  let awsS3File;

  try {
     awsS3File = await uploadFile(req.file)
  } catch (err) {
    const error = new HttpError(
      'uploading image to s3 failed, please try again later.',
      500
    );
    return next(error);
  }

    existingUser.name = name;
    existingUser.image = awsS3File.Key;

    
  try {
    await existingUser.save();
  } catch (err) {
    const error = new HttpError(
      err + 'Updating User failed, please try again later.,save',
      500
    );
    return next(error);
  }




  try {
     await deleteFile(imagePath)
  } catch (err) {
    // const error = new HttpError(
    //   'delteting image to s3 failed, please try again later.',
    //   500
    // );
    // return next(error);
    console.log("deleting image failed")
  }

  if (req.file) {
    fs.unlink(`uploads/images/${imagePath}`, (err) => {
      if (err) {
          console.log(err,"unlink error");
      }
      console.log('deleted');
  })};

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'updating failed, please try again later.',
      500
    );
    return next(error);
  }

  res
  .status(201)
  .json({ userId: existingUser.id,name : existingUser.name, profile : existingUser.image, email: existingUser.email, token: token });
};
  



exports.getUsers = getUsers;
exports.getUser = getUser;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
