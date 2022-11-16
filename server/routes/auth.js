const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// Log in 
router.post('/login', authController.logIn);

module.exports = router;