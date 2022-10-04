const path = require('path');
const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// Get all products to render to frontend => GET localhost:5000/products
router.get('/products', shopController.getProducts);

// Add to cart
router.post('/cart', shopController.postCart);

module.exports = router;
