const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

const MONGODB_URI = 'mongodb+srv://sang2x:sang123@cluster0.j1wx6nb.mongodb.net/social';

const server = express();
server.use(cors());
server.use(express.json({
  type: ['application/json']
}));

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image.jpeg') {
    cb(null, true);
  } else {
    cb(null, true);
  }
}

server.use(bodyParser.urlencoded({ extended: false }));
server.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
server.use('/images', express.static(path.join(__dirname, 'images')));

server.use(authRoute);
server.use(userRoute);

server.use((error, req, res, next) => {
  console.log(error)
  res.status(error.httpStatusCode).json({ msg: 'There is an error' });
})

mongoose.connect(MONGODB_URI)
  .then(result => server.listen(5000))
  .catch(err => console.log(err));

