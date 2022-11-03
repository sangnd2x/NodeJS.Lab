const Product = require('../models/products');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.send(products);
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart
                .getProducts({ where: { id: prodId } })
                .then(products => {
                    let product;
                    if (products.length > 0) {
                        product = products[0];
                    }
                    if (product) {
                        const oldQuantity = product.cartItem.quantity;
                        newQuantity = oldQuantity + 1;
                        return product;
                    }
                    return Product.findById(prodId);
                })
                .then(product => {
                    return fetchedCart.addProduct(product,
                        { through: { quantity: newQuantity } }
                    );
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.send(products)
                })
                .catch(err => console.log(err));
        })
        .catch();
}

exports.postCartDeletedProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(results => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ msg: 'delete succeed' }));
            res.end();
        })
        .catch(err => console.log(err));
}

exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity };
                        return product;
                    }));
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null)
        })
        .then(result => console.log(result))
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({include: ['products']})
        .then(orders => {
            console.log(orders);
            res.statusCode = 200;
            res.send(orders);
            res.end();
        })
        .catch(err => console.log(err));
}
