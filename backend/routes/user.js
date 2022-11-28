const path = require('path');
const express = require('express');
const userController = require('../controllers/user');
const jwtAuth = require('../middleware/jwtAuth');
const router = express.Router();

// post new post 
router.post('/new-post', userController.postNewPost);

// get posts
router.get('/posts', userController.getPosts);


module.exports = router;