const express = require('express');
const { getproducts, newProduct } = require('../Controllers/productController');
const router = express.Router();

router.route('/products').get(getproducts);
router.route('/products/new').post(newProduct);

module.exports = router