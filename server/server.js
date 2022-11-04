const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoConnect = require('./util/database').mongoConnect;
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
    User.findById('63647e6827d399baabd30890')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
})

server.use(adminRoute);
server.use(shopRoute);

mongoConnect(() => {
    server.listen(5000);
})
