const path = require('path');
const express = require('express');
const userController = require('../controllers/user');
const jwtAuth = require('../middleware/jwtAuth');
const router = express.Router();

// post new post 
router.post('/new-post', jwtAuth, userController.postNewPost);

// get posts
router.get('/posts', jwtAuth, userController.getPosts);

// get post details
router.get('/posts/:postId', jwtAuth, userController.getPostDetails);

// post edit post
router.post('/posts/edit/:postId', jwtAuth, userController.postEditPost);

// delete post
router.post('/post/delete/:postId', jwtAuth, userController.deletePost);

module.exports = router;