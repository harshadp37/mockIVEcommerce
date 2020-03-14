const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product');

//return List of Products
router.get('/', productController.getAllProducts);

//Add New Product
router.post('/create', productController.addProduct);

module.exports = router;