const Product = require('../models/products');
const Cart = require('../models/cart');

// Fetch all products
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.send(products);
    }).catch(err => console.log(err));
  };

  // Add new product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // order of these args have to match the order in model/products
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(results => console.log('added product'))
    .catch();
}

// Get selected edit product
exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit;
  const id = req.params.productId;
  if (!isEdit) {
    return res.redirect('/');
  }
  Product.findAll({where: {id: id}})
    .then(products => {
      res.send(products[0]);
    })
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
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle,
      product.imageUrl = updatedImageUrl,
      product.price = updatedPrice,
      product.description = updatedDescription
      return product.save();
    })
    .then(results => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ msg: 'edit succeed' }));
      res.end();
    })
    .catch(err => console.log(err));
}

exports.postDeletedProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(results => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ msg: 'delete succeed' }));
    res.end();
    })
    .catch(err => console.log(err));
}

exports.postCartDeletedProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({ msg: 'delete succeed' }));
  res.end();
}