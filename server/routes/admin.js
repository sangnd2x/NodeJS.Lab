const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

//GET fetch all products
router.get('/admin/products', adminController.getProducts);

// POST localhost:5000/add-product 
router.post('/add-product', adminController.postAddProduct);

// GET edit product
router.post('/edit-product/:productId', adminController.getEditProduct);

// GET edit product
router.get('/edit-product/:productId', adminController.sendEditProduct);

module.exports = router;