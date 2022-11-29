const User = require('../models/user');
const Post = require('../models/post')
const jwt = require('jsonwebtoken');
const io = require('../socket');
const user = require('../models/user');
require('dotenv').config();

exports.postNewPost = (req, res, next) => {
  // console.log(req.file);
  const title = req.body.title;
  const image = req.file;
  const content = req.body.content;
  const date = new Date().toISOString();

  if (!image) {
    res.statusMessage = 'Invalid image type';
    return res.status(422).end();
  }

  const imageUrl = 'http://localhost:5000/' + image.path;

  const post = new Post({
    title: title,
    imageUrl: imageUrl,
    content: content,
    date: date,
    userId: req.user
  });
  
  post.save()
    .then(result => {
      return User.findById(req.user._id);
    })
    .then(user => {
      user.userPosts.push(post);
      io.getIO().emit('posts', { action: 'create', post: post });
      return user.save();
    })
    .then(result => {
      res.statusMessage = 'New post created';
      res.status(200).end();
    })
    .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.statusMessage = 'Successfully fetched posts';
      res.status(200).send(posts);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getPostDetails = (req, res, next) => {
  const id = req.params.postId;
  // console.log(id);

  Post.findById(id)
    .then(post => {
      res.statusMessage = 'Successfully fetched single post';
      res.status(200).send(post);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditPost = (req, res, next) => {
  const postId = req.params.postId;
  const updateTitle = req.body.title;
  const updateImage = req.file;
  const updateContent = req.body.content;
  
  Post.findById(postId)
    .then(post => {
      if (updateTitle) {
        post.title = updateTitle;
      }

      if (updateImage) {
        post.imageUrl = updateImage;
      }

      if (updateContent) {
        post.content = updateContent;
      }

      post.save()
        .then(result => {
          Post.find().then(posts => {
            io.getIO().emit('posts', { action: 'update', post: posts });
          })
          res.statusMessage = 'Post edited';
          res.status(200).end();
      })
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  
};

exports.deletePost = (req, res, next) => {
  const id = req.params.postId;

  Post.findById(id)
    .then(post => {
      return post.remove();
    })
    .then(result => {
      return User.findById(req.user._id);
    })
    .then(user => {
      user.userPosts.pull(id);
      Post.find().then(posts => {
        io.getIO().emit('posts', { action: 'delete', post: posts });
      })
      return user.save();
    })
    .then(result => {
      res.statusMessage = 'Post deleted';
      res.status(200).end();
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}