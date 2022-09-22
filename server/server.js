const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));

server.use(cors({
    origin: "*",
}));

const users = [];

server.get('/', (req, res, next) => {
    const json = JSON.stringify('users', users);
    res.json(json);
});

server.post('/users', (req, res, next) => {
    console.log(req.body);
});

server.listen(5000);