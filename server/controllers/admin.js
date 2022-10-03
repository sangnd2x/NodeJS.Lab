const Product = require('../models/products');

exports.postAddProduct = (req, res, next) => {
    console.log('from admin controller', req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, imageUrl, description);
    product.save();
}