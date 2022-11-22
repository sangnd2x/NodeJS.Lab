const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');

const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://sang2x:sang123@cluster0.j1wx6nb.mongodb.net/shop';
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const server = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

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
server.use(session({
  secret: 'you are a wizard Harry',
  resave: false,
  saveUninitialized: false,
  store: store
}));

server.use(flash());
server.use(authRoute);
    
server.use(async (req, res, next) => {
  console.log('from server', req.session);
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
    // console.log('from server', user);
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      throw new Error(err);
    });
});

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
