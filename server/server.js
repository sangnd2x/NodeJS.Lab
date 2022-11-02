const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const Product = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item')

const server = express();

const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

server.use(cors());

// Tell server to expect json file
server.use(express.json({
    type: ['application/json']
}));

server.set('view engine', 'ejs');
server.set('views', 'views');
    ;
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

server.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

server.use(adminRoute);
server.use(shopRoute);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    // .sync({force:true})
    .sync()
    .then(results => {
        return User.findById(1)
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Sang', email: 'sang2x@gmail.com'})
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        user.createCart();
        server.listen(5000);
    })
    .catch(err => console.log(err));
