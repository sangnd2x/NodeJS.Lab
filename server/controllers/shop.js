const Product = require('../models/products');

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.send(products);
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => console.log(result))
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            res.send(cart);
        })
        .catch();
}

exports.postCartDeletedProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(results => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ msg: 'delete succeed' }));
            res.end();
        })
        .catch(err => console.log(err));
}

exports.postOrders = (req, res, next) => {
    req.user
        .addOrder()
        .then(result => console.log(result))
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            console.log(orders);
            res.statusCode = 200;
            res.send(orders);
            res.end();
        })
        .catch(err => console.log(err));
}
