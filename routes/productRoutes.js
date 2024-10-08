const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProductsByName } = require('../controllers/productController');
const router = express.Router();

router.get('/search', searchProductsByName);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/product', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
