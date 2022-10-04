const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart{
    static addProduct(id, productPrice) {
        // get previous cart if exsited
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

             // read the cart, find existed product
            const existedProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existedProduct = cart.products[existedProductIndex];
            let updatedProduct;

            // add updated product, increase quantity
            if (existedProduct) {
                updatedProduct = { ...existedProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existedProduct] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
}