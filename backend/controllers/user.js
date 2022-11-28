const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.postNewPost = (req, res, nex) => {
  console.log(req.file);
  const title = req.body.title;
  const image = req.file;
  const content = req.body.content;
  const date = new Date().toDateString();
  
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
    .catch(err => console.log(err));
};

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      console.log(posts);
      res.status(200).send(posts);
    })
    .catch(err => console.log(err));
}