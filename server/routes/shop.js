const path = require('path');
const express = require('express');

const shopController = require('../controllers/shop');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

// Get all products to render to frontend => GET localhost:5000/products
router.get('/index', shopController.getIndex);

// Add to cart
router.post('/cart', jwtAuth, shopController.postCart);

// Fetch all products from cart => GET //localhost:5000/cart
router.get('/cart', jwtAuth, shopController.getCart);

// POST cart deleted product
router.post('/cart/delete-product', jwtAuth, shopController.postCartDeletedProduct);

// POST cart to order
router.post('/create-order', jwtAuth, shopController.postOrders);

// GET order items
router.get('/orders', jwtAuth, shopController.getOrders);

// Get invoice
router.get('/orders/:orderId', jwtAuth, shopController.getInvoice);

module.exports = router;
