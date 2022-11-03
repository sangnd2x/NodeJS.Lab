const path = require('path');
const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// Get all products to render to frontend => GET localhost:5000/products
router.get('/products', shopController.getProducts);

// // Add to cart
// router.post('/cart', shopController.postCart);

// // Fetch all products from cart => GET //localhost:5000/cart
// router.get('/cart', shopController.getCart);

// // POST cart deleted product
// router.post('/cart/delete-product', shopController.postCartDeletedProduct);

// // POST cart to order
// router.post('/create-order', shopController.postOrders);

// // GET order items
// router.get('/order', shopController.getOrders);

module.exports = router;
