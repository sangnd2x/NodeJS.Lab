const db = require('../util/databse');

const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id,
        this.title = title,
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
    };

    static fetchAll(cb) {
        return db.execute('SELECT * FROM products');
    };

    save() {
        return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description]);
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

    static findById(id) {
        return db.execute('SELECT * FROM products where products.id=?',[id])
      };
}