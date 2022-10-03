const path = require('path');
const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// Get all products to render to fronend
router.get('/products', shopController.getProducts);

module.exports = router;
