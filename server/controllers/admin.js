const Product = require('../models/products');
const Cart = require('../models/cart');

// Fetch all products
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.send(products);
    });
  };

  // Add new product
exports.postAddProduct = (req, res, next) => {
    console.log('from admin controller', req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    // order of these args have to match the order in model/products
    const product = new Product(null, title, imageUrl, description, price);
    product.save()
      .then(() => {
        // Send response so the frontend knows that POST request succeed
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ msg: 'success' }));
        res.end();
      })
      .catch(err => console.log(err));    
}

// Get selected edit product
exports.getEditProduct = (req, res, next) => {
  const isEdit = req.query.edit;
  const id = req.params.productId;
  if (!isEdit) {
    return res.redirect('/');
  }
  Product.findById(id, product => {
    res.send(product);
    res.end();
  });
}

// Post edited product
exports.postEditedProduct = (req, res, next) => {
  console.log(req.body);
  const prodId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.statusCode = 200;
  res.end();
}

exports.postDeletedProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.deleteProductById(prodId);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({ msg: 'delete succeed' }));
  res.end();
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