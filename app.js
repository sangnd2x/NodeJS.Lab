const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Second middleware');
//     res.send('<h1>Hello Mom!<h1>')
// });

app.use('/users', (req, res, next) => {
    console.log('From "/user" middleware');
    res.send('<p><ul><li>User 1</li><li>User 2</li><ul></p>')
});

app.use('/', (req, res, next) => {
    console.log('From "/" middleware');
    res.send('<h1>Hello there!</h1><h1>General Kenobi</h1><img src="https://i.pinimg.com/originals/40/74/60/407460925c9e419d82b93313f0b42f71.jpg"/>');
});

app.listen(3000);