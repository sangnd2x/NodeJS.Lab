const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.logIn = (req, res, next) => {
  const { username, password } = req.body;
  User
    .findOne({ name: username })
    .then(user => {
      if (!user) {
        req.flash('error', 'No username found!');
        res.status(400).json(req.flash('error'));
      } else {
        bcrypt.compare(password, user.password)
          .then(isMatched => {
            if (isMatched) {
              req.session.user = user;
              req.session.isLoggedIn = true;
              req.flash('loggedIn', 'Successfully logged in!');
              req.session.save((err) => {
                if (err) console.log(err);
                console.log('session created!', req.session);
                return res.status(200).json(req.flash('loggedIn'));
              })
            } else {
              req.flash('error1', 'Wrong password!');
              res.status(400).json(req.flash('error1'));
            }
          })
      }
    })
    .catch(err => console.log(err));
}

exports.signUp = (req, res, next) => {
  const { username, email, password } = req.body;
  User
  .findOne({ email: email })
  .then(user => {
    if (user) {
      res.status(400).json({ msg: 'Email is already used!' });
    } else {
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
          res.status(200).json({ msg: 'New user created!' });
        })
      })
    }
  })
  .catch(err => console.log(err));
}

exports.logOut = (req, res, next) => {
  req.session.destroy(() => {
    console.log('destroyed')
    res.status(200).json({ msg: 'deleted' });
  })
};