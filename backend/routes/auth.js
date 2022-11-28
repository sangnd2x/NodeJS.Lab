const path = require('path');
const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

// sign up 
router.post('/sign-up', authController.postSignUp);

// log in
router.post('/login', authController.postLogin);

module.exports = router;