const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product');

//return List of Products
router.get('/', productController.getAllProducts);

//Add New Product
router.post('/create', productController.addProduct);

//Update Existing Product
router.post('/:id/update_quantity', productController.updateProduct);

//Delete Existing Product
router.delete('/:id', productController.deleteProduct);

module.exports = router;