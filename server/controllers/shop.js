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
    .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
	Product.findById(prodId)
    .then(product => {
      // console.log(req.session.user)
      res.status(200).json({ msg: 'Product added to cart' });
      return req.user.addToCart(product);
		})
		.then(result => console.log(result))
		.catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
	req.user
    .populate('cart.items.productId')
    .then(user => {
        res.send(user.cart.items);
    })
    .catch(err => console.log(err));
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
			.catch(err => console.log(err));
}

exports.postOrders = (req, res, next) => {
	req.user
		.populate('cart.items.productId')
		.then(user => {
				const products = user.cart.items.map(i => {
						return { quantity: i.quantity, product: {...i.productId._doc} };
				})
				const order = new Order({
						user: {
								name: req.user.name,
								userId: req.user
						},
						products: products
				});
				return order.save();
		})
		.then(result => req.user.clearCart())
		.catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
	Order.find({ 'user.userId': req.user._id })
		.then(orders => {
      console.log(orders);
      res.status(200).send(orders);
		})
		.catch(err => console.log(err));
}


