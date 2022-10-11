const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.send(products);
    });
};

exports.postCart = (req, res, next) => {
    console.log(req.body);
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.addProduct(prodId, product.price);
    });
    res.statusCode = 200;
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (let product of products) {
                const productData = cart.products.find(prod => prod.id === product.id);
                if (productData) {
                    cartProducts.push({ productData: product, qty: productData.qty });
                }
            }
            res.send(cartProducts);
        });
    });
}
