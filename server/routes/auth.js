const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// Log in 
router.post('/login', authController.logIn);

// Log out 
router.post('/logout', authController.logOut);

// Sign up
router.post('/sign-up', authController.signUp);

module.exports = router;