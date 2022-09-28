const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json({
    type: ['application/json']
}));

const users = [];

server.post('/add-user', (req, res) => {
    users.push(req.body);
})

server.get('/users', (req, res) => {
    res.send(users.filter(user => user.length > 0));
})

server.listen(5000);