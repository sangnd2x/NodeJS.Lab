const Product = require('../models/products');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    });
  };

exports.postAddProduct = (req, res, next) => {
    console.log('from admin controller', req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    // order of these args have to match the order in model/products
    const product = new Product(title, imageUrl, description, price);
    product.save();

    // Send response so the frontend knows that POST request succeed
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ msg: 'success' }));
    res.end();
}

exports.getEditProduct = (req, res, next) => {
  console.log(req.query);
  const editMode = req.query.edit;
  const prodId = req.body.productId;
  console.log(prodId);
  console.log(editMode);
  if (!editMode) {
      res.redirect('/');
  }
  const product = Product.findById(prodId, product => {
    return product;
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(product);
  res.end();
}

exports.sendEditProduct = (req, res, next) => {
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
