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
  body('title').isString().isLength({ min: 3 }),
  body('imageUrl').isURL(),
  body('price').isNumeric(),
  body('description').isLength({ min: 5 }),
  adminController.postAddProduct
);

// GET edit product localhost:5000/edit-product/:productId
router.get('/edit-product/:productId', adminController.getEditProduct);

// POST edited product
router.post('/edit-product', adminController.postEditedProduct);

// POST deleted product
router.post('/delete-product', adminController.postDeletedProduct);



module.exports = router;