const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config(); 

const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j1wx6nb.mongodb.net/${process.env.DB_DEFAULT}`;
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const server = express();

server.use(cors());
server.use(express.json({
    type: ['application/json']
}));

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

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

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flag: 'a' }); // flag : 'a' means append

server.use(bodyParser.urlencoded({ extended: false }));
server.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
server.use(express.static(path.join(__dirname, 'public')));
server.use('/images', express.static(path.join(__dirname, 'images')));
server.use(helmet());
server.use(compression());
server.use(morgan('combined', { stream: accessLogStream }));

server.use(flash());
server.use(authRoute);
server.use(adminRoute);
server.use(shopRoute);

server.use((error, req, res, next) => {
  console.log(error);
  res.status(error.httpStatusCode).json({msg:'error'});
});

mongoose
	.connect(MONGODB_URI)
  .then(result => {
    // https.createServer({ key: privateKey, cert: certificate }, server).listen(process.env.PORT || 5000);
    server.listen(process.env.PORT || 5000)
  })
	.catch(err => console.log(err));
