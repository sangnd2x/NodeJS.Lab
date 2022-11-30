const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.statusMessage = errors.array()[0].msg;
    return res.status(422).end();
  } else {
    User.findOne({ name: username })
      .then(user => {
        // console.log(user)
        bcrypt.compare(password, user.password)
          .then(isMatched => {
            if (isMatched) {
              const accessToken = jwt.sign(user.toJSON(),`${process.env.ACCESS_TOKEN_SECRET}`);
              res.statusMessage = 'Successfully logged in!';
              res.status(200).json({ accessToken: accessToken });
            } else {
              res.statusMessage = 'Wrong password!';
              res.status(400).end();
            }
          })
          .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
    })
  }
}

exports.postSignup = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array())
    res.statusMessage = errors.array()[0].msg;
    return res.status(422).end();
  }
  bcrypt.hash(password, 12)
    .then(hashPass => {
      const user = new User({
        name: username,
        email: email,
        password: hashPass,
        cart: { item: [] }
      });
      user.save()
        .then(result => {
          res.statusMessage = 'New user created!';
          return res.status(200).end();
      })
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.logOut = (req, res, next) => {
  res.status(200).json({ msg: 'deleted' });
};

exports.getLogin = (req, res, next) => {
  console.log(req.session.loggedIn);
}