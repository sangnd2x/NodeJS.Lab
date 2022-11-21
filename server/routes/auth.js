const path = require('path');

const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

// Log in 
router.get('/login', authController.getLogin);
router.post('/login',
  body('email')
    .notEmpty()
    .withMessage('Please enter email!'),
  body('password')
    .notEmpty()
    .withMessage('Please enter password'),
  authController.postLogin);

// Log out 
router.post('/logout', authController.logOut);

// Sign up
router.post('/sign-up',
  body('username', 'Please enter valid username')
    .notEmpty(),
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Please enter valid email!')
    .custom((value, { req }) => {
      return User
        .findOne({ email: value })
        .then(user => {
          if (user) {
            return Promise.reject('Email is already used!');
          }
        }) 
      }),
  body('password', 'Please enter password longer than 6 characters')
    .notEmpty()
    .isLength({ min: 8 }),
  body('confirm-password')
    .notEmpty()
    .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password has to match!');
    }
    return true;
  }),
  authController.postSignup
);

module.exports = router;