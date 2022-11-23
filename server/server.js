const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const flash = require('connect-flash');
const multer = require('multer');

const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://sang2x:sang123@cluster0.j1wx6nb.mongodb.net/shop';
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const server = express();

server.use(cors());
server.use(express.json({
    type: ['application/json']
}));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

server.use(bodyParser.urlencoded({ extended: false }));
server.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
server.use(express.static(path.join(__dirname, 'public')));
server.use('/images', express.static(path.join(__dirname, 'images')));

server.use(flash());
server.use(authRoute);
    
// server.use((req, res, next) => {
  

  // console.log('from server', req.session);
  // if (!req.session.user) {
  //   return next();
  // }
  // User.findById(req.session.user._id)
  //   .then(user => {
  //   // console.log('from server', user);
  //     if (!user) {
  //       return next();
  //     }
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => {
  //     throw new Error(err);
  //   });
// });

// function jwtAuth(req, res) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ');
//   if (token === null) return res.status(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403);
//     req.user = user;
//     console.log(req.user);
//     next();
//   });
// }

server.use(adminRoute);
server.use(shopRoute);

server.use((error, req, res, next) => {
  console.log(error);
  res.status(error.httpStatusCode).json({msg:'error'});
});

mongoose
	.connect(MONGODB_URI)
	.then(result => server.listen(5000))
	.catch(err => console.log(err));
