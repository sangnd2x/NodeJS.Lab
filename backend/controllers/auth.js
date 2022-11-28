const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sign up 
exports.postSignUp = (req, res, next) => {
  const { email, name, password } = req.body;

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
    .catch(err => console.log(err));
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.statusMessage = 'Email not found';
        return res.status(404).end();
      } else {
        bcrypt.compare(password, user.password)
          .then(isMatched => {
            if (!isMatched) {
              res.statusMessage = 'Wrong password';
              return res.status(400).end();
            } else {
              const accessToken = jwt.sign(user.toJSON(), `${process.env.ACCESS_TOKEN_SECRET}`);
              res.statusMessage = 'Successfully logged in';
              res.status(200).json({ accessToken : accessToken });
            }
          })
      }
    })
    .catch(err => console.log(err));
}