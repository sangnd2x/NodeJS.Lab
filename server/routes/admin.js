const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//GET fetch all products
router.get('/admin/products', adminController.getProducts);

// POST localhost:5000/add-product 
router.post('/add-product',
  body('title').isString().isLength({ min: 3 }).trim(),
  body('price').isNumeric(),
  body('description').isLength({ min: 5 }).trim(),
  adminController.postAddProduct
);

// GET edit product localhost:5000/edit-product/:productId
router.get('/edit-product/:productId', adminController.getEditProduct);

// POST edited product
router.post('/edit-product',
  body('title', 'Title must be a string and has more than 3 characters')
    .isString().isLength({ min: 3 }).trim(),
  body('price', 'Must be number').isNumeric(),
  body('description', 'Description must has more than 5 characters and less than 300 characters')
    .isLength({ min: 5, max: 300 }).trim(),
  adminController.postEditedProduct
);

// POST deleted product
router.post('/delete-product', adminController.postDeletedProduct);



module.exports = router;