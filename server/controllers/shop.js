const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.send(rows);
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    console.log(req.body);
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(([product]) => {
            console.log(product[0]);
            const id = product[0].id;
            const productPrice = product[0].price;
            // Cart.addProduct(id, productPrice);
            // res.statusCode = 200;
        })
        .catch(err => console.log(err));
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
            res.statusCode = 200;
            res.send(cartProducts);
            res.end();
        });
    });
}
