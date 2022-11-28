const path = require('path');
const express = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const User = require('../models/user');
const router = express.Router();

// sign up 
router.post('/sign-up',
  [
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('Please enter valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then(user => {
            if (user) {
              return Promise.reject('Email is already been used');
            }
          });
      }),
    body('password')
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Please enter correct password')
  ],
  authController.postSignUp);

// log in
router.post('/login',
  [
    body('email')
      .notEmpty()
      .isEmail()
    .withMessage('Please enter valid email'),
  body('password')
    .notEmpty()
    .withMessage('Please enter correct password'),
  ],
  authController.postLogin);

module.exports = router;