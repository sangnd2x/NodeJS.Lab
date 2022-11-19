const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://sang2x:sang123@cluster0.j1wx6nb.mongodb.net/shop';

const server = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

server.use(cors());
server.use(express.json({
    type: ['application/json']
}));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(session({
    secret: 'no secret',
    resave: false,
    saveUninitialized: false,
    store: store
    })
);

server.use(flash());
server.use(authRoute);
    
server.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

server.use(adminRoute);
server.use(shopRoute);

mongoose
	.connect(MONGODB_URI)
	.then(result => server.listen(5000))
	.catch(err => console.log(err));
