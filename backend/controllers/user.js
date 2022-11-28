const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
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
        req.statusMessage = 'New Post Added';
        res.status(200).end();
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  // }
};

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      // console.log(posts);
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
  Post.findOne({ _id: id })
    .then(post => {
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
  
  Post.findOne({ _id: postId })
    .then(post => {
      if (updateTitle) {
        post.title = updateTitle;
      }

      if (updateImage) {
        post.imageUrl = 'http://localhost:5000/' + updateImage.path;
      }

      if (updateContent) {
        post.content = updateContent;
      }
      post.save()
        .then(results => {
          res.statusMessage = 'Post is successfully updated';
          res.status(200).end();
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  
};

exports.deletePost = (req, res, next) => {
  const id = req.params.postId;
  Post.findOne({ _id: id })
    .then(post => {
      post.remove().then(result => {
        res.statusMessage = 'Post deleted';
        res.status(200).end();
      })
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}