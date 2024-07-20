const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductByName } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:name', getProductByName);
router.post('/product', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
