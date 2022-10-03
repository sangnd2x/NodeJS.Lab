const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// POST localhost:5000/add-product 
router.post('/add-product', adminController.postAddProduct);

module.exports = router;