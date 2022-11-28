const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

// Sign up 
exports.postSignUp = (req, res, next) => {
  const { email, name, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.statusMessage = errors.array()[0].msg;
    return res.status(422).end();
  } else {
    User
    .findOne({ email: email })
    .then(user => {
      if (user) {
        res.statusMessage = 'This email has been used';
        return res.status(400).end();
      } else {
        bcrypt.hash(password, 12)
          .then(hashPass => {
            const user = new User({
              email: email,
              name: name,
              password: hashPass,
              userPosts: { posts: [] }
            });
            user.save().then(result => {
              res.statusMessage = 'New user created';
              return res.status(200).end();
            });
          })
      }
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  }
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  console.log(errors.array())

  if (!errors.isEmpty()) {
    res.statusMessage = errors.array()[0].msg;
    return res.status(422).end();
  } else {
    User.findOne({ email: email })
      .then(user => {
        bcrypt.compare(password, user.password)
          .then(isMatched => {
            if (!isMatched) {
              res.statusMessage = 'Wrong password';
              return res.status(400).end();
            } else {
              const accessToken = jwt.sign(user.toJSON(), `${process.env.TOKEN}`);
              res.statusMessage = 'Successfully logged in';
              res.status(200).json({ accessToken: accessToken });
            }
          });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
    }
}