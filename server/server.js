const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoConnect = require('./util/database').mongoConnect;

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
    // User.findById(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => console.log(err));
    next();
})

server.use(adminRoute);
server.use(shopRoute);

mongoConnect(() => {
    server.listen(5000);
})
