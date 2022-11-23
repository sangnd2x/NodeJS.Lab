const fs = require('fs');
const path = require('path');
const Product = require('../models/products');
const Order = require('../models/order');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');

exports.getIndex = (req, res, next) => {
  Product
    .find()
    .populate('userId')
    .then(products => {
      res.status(200).send(products);
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
      // console.log('from order', user);
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
      res.status(200).json({ msg: 'Order created' });
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
      // console.log(orders);
      res.status(200).send(orders);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return next(new Error('No order found'));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error('Unauthorized'));
      }
      const invoiceName = 'invoice-' + orderId + '.pdf';
      const invoicePath = path.join('data', 'invoices', invoiceName);
      const pdfDoc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(25).text('Hello General Kenobi');

      pdfDoc.text('------------------------------');
      let totalPrice = 0
      order.products.forEach(prod => {
        totalPrice = totalPrice + prod.quantity * prod.product.price;
        pdfDoc.fontSize(14).text(prod.product.title + ' - ' + prod.quantity + ' x ' + '$' + prod.product.price);
      });
      pdfDoc.text('------------------------------');
      pdfDoc.fontSize(25).text('Total price:' + '$' + totalPrice);
      
      pdfDoc.end();
      res.status(200);
    })
    .catch(err => next(err));
  
  // fs.readFile(invoicePath, (err, data) => {
  //   if (err) {
  //     next(err);
  //   }
  //   res.setHeader('Content-Type', 'application/pdf');
  //   // res.setHeader('Content-Disposition', 'inline')
  //   res.send(data);
  // });
};
