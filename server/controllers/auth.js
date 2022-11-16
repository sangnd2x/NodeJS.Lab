const User = require('../models/user');

exports.logIn = (req, res, next) => {
    const { username, password } = req.body;
    User
        .findOne({ username: username, password: password })
        .then(user => {
        if (user) {
            req.session.userId = user._id;
            res.status(200).json({ msg: 'logged in' });
            } 
        })
        .catch(err => console.log(err));
}
  
exports.logOut = (req, res, next) => {
    req.session.destroy(() => {
        console.log('destroyed')
        res.status(200).json({ msg: 'deleted' });
    })
} 