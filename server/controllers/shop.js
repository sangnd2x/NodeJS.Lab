const Product = require('../models/products');
const Order = require('../models/order');
const mongoose = require('mongoose');

exports.getIndex = (req, res, next) => {
  Product
    .find()
    .populate('userId')
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
	Product.findById(prodId)
    .then(product => {
      // console.log(req.session.user)
      req.user.addToCart(product);
      res.statusMessage = 'Product added to cart'
      return res.status(200).end()
		})
		.then(result => console.log('Product added to cart'))
		.catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
	req.user
    .populate('cart.items.productId')
    .then(user => {
        res.status(200).send(user.cart.items);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.postCartDeletedProduct = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
    .removeFromCart(prodId)
    .then(results => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ msg: 'delete succeed' }));
        res.end();
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.postOrders = (req, res, next) => {
	req.user
		.populate('cart.items.productId')
    .then(user => {
      console.log(user.cart.items);
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      req.user.clearCart();
    })
		.catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.getOrders = (req, res, next) => {
	Order.find({ 'user.userId': req.user._id })
  .then(orders => {
    console.log(orders);
    res.status(200).send(orders);
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
}


