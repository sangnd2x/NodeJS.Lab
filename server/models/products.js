const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id,
        this.title = title,
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
    };

    static fetchAll(cb) {
        getProductsFromFile(cb);
    };

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existedProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existedProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log('from product model', err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log('from product model', err);
                });
            }
        });
    };


    static deleteProductById(id) {
        console.log('id', id)
        getProductsFromFile(products => {
            const product = products.find(prod => console.log('prodId', prod.id));
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            })
        })
    }

    static findById(id, cb) {
        getProductsFromFile(produdcts => {
            const product = produdcts.find(p => p.id === id);
            cb(product);
        });
      };
}