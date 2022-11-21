const Product = require('../models/products');
const User = require('../models/user');
const { validationResult } = require('express-validator');

// Fetch all products
exports.getProducts = (req, res, next) => {
  // throw new Error('error');
  Product.find()
    .populate('userId')
    .then(products => {
      res.status(200).send(products);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  };

  // Add new product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const errors = validationResult(req);
  console.log(errors)

  // order of these args have to match the order in model/products
  if (!errors.isEmpty()) {
    res.statusMessage = errors.array()[0].msg;
    return res.status(422).end();
  } else {
    const product = new Product({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user
    });
    product
      .save()
      .then(results => {
        console.log('added product');
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  }
}

// Get selected edit product
exports.getEditProduct = (req, res, next) => {
  
  const id = req.params.productId;
  Product.findById(id)
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

// Post edited product
exports.postEditedProduct = (req, res, next) => {
  const prodId = req.body._id;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.statusMessage = errors.array()[0].msg;
    return res.status(422).send(JSON.stringify({ type : errors.array()[0].param})).end();
  } else {
    Product
    .findById(prodId)
    .then(product => {
      console.log('from edit prod', product);
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      product.save()
        .then(result => {
          console.log(result)
          console.log('Updated');
          res.status(200).json({ msg: 'Edited!' });
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  }
}

// POST delete product
exports.postDeletedProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
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



