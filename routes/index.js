const express = require('express');
const router = express.Router();

router.use('/products', require('./products/product'))

module.exports = router;