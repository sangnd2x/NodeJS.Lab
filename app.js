const path = require('path');

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

// import index and users route
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// make public/main static
app.use(express.static(path.join(__dirname, 'public')));

// use index and users routes
app.use(usersRouter);
app.use(indexRouter);

app.listen(3000);