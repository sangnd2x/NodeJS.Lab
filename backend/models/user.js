const mongoose = require('mongoose')
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
  userPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);