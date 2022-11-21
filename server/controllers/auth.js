const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  
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
              })
              res.statusMessage = req.flash('loggedIn')
              res.status(200).end();
            } else {
              req.flash('error1', 'Wrong password!');
              res.statusMessage = req.flash('error1')
              res.status(400).end();
            }
          })
          .catch(err => console.log(err));
      })
  }
}

exports.postSignup = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);

  // Set up to send email
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'sangtesting123@outlook.com',
      pass: '123456789!@@!'
    }
  })

  let mailDetails = {
    from: 'sangtesting123@outlook.com',
    to: 'derp12.08@gmail.com',
    subject: 'Email from Node.js',
    text: 'Success'
  }

  // Sign up
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
          transporter.sendMail(mailDetails, (err, info) => {
            if (err) {
              return console.log(err);
            } else {
              console.log('Email sent' + info.response);
            }
          })
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

exports.getLogin = (req, res, next) => {
  console.log(req.session.loggedIn);
}