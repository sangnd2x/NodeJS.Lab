const mongodb = require('mongodb');
const Product = require('../models/products');

const ObjectId = mongodb.ObjectId;

// Fetch all products
exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  // Product.findAll()
    .then(products => {
      res.send(products);
    })
    .catch(err => console.log(err));
  };

  // Add new product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // order of these args have to match the order in model/products
  const product = new Product(title, price, description, imageUrl, null, req.user._id);
  product.save()
    .then(results => console.log('added product'))
    .catch();;
}

// Get selected edit product
exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit;
  const id = req.params.productId;
  if (!isEdit) {
    return res.redirect('/');
  }
  Product.findById(id)
    .then(product => res.send(product))
    .catch(err => console.log(err));
}

// Post edited product
exports.postEditedProduct = (req, res, next) => {
  console.log(req.body);
  const prodId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageUrl,
    prodId);
  product.save()
    .then(results => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ msg: 'edit succeed' }));
      res.end();
    })
    .catch(err => console.log(err));
}

// POST delete product
exports.postDeletedProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(results => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ msg: 'delete succeed' }));
    res.end();
    })
    .catch(err => console.log(err));
}

