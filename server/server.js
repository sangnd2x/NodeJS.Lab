const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

const server = express();

const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

server.use(cors());

// Tell server to expect json file
server.use(express.json({
    type: ['application/json']
}));

server.set('view engine', 'ejs');
server.set('views', 'views');
    ;
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

server.use((req, res, next) => {
    User.findById('6364c1e1a96c039f2d5d8c38')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

server.use(adminRoute);
server.use(shopRoute);

mongoose
    .connect('mongodb+srv://sang2x:sAg12081995@cluster0.j1wx6nb.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'sang',
                    email: 'sang@test.com',
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
