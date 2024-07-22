//routes/categoryRoutes.js
const express = require('express');
const {getCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/category', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;