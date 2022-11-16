const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const User = require('./models/user');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

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

// Tell server to expect json file
server.use(express.json({
    type: ['application/json']
}));

server.set('view engine', 'ejs');
server.set('views', 'views');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(
    session({
      secret: 'no secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

server.use((req, res, next) => {
    User.findById('6374a0e90e88aeddc2a41ff6')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

server.use(adminRoute);
server.use(shopRoute);
server.use(authRoute)

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'sang',
                    password: '123',
                    email: 'test@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        server.listen(5000);
    })
    .catch(err => console.log(err));
