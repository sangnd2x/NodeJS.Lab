const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

server.use(cors());

// Tell server to expect json file
server.use(express.json({
    type: ['application/json']
}));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

server.use(adminRoute);
server.use(shopRoute);

server.listen(5000);