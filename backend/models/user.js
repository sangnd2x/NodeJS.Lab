const mongoose = require('mongoose')
const Post = require('./post');
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }, 
  userPosts: {
    posts: [
      {
        postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
      }
    ]
  }
});

module.exports = mongoose.model('User', userSchema);