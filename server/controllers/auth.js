const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password)
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.statusMessage = errors.array()[0].msg;
    return res.status(422).end();
  } else {
    User.findOne({ email: email })
      .then(user => {
        // console.log(user);
        bcrypt.compare(password, user.password)
          .then(isMatched => {
            if (isMatched) {
              req.session.user = user;
              req.session.isLoggedIn = true;
              req.flash('loggedIn', 'Successfully logged in!');
              req.session.save((err) => {
                if (err) console.log(err);
                console.log('session created!', req.session);
                res.statusMessage = req.flash('loggedIn')
                return res.status(200).end();
              })
            } else {
              req.flash('error1', 'Wrong password!');
              res.statusMessage = req.flash('error1')
              return res.status(400).end();
            }
          })
          .catch(err => console.log(err));
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
    .catch(err => console.log(err));
}

exports.logOut = (req, res, next) => {
  req.session.destroy(() => {
    console.log('destroyed')
    res.status(200).json({ msg: 'deleted' });
  })
};