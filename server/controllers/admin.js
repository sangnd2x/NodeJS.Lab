const Product = require('../models/products');

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