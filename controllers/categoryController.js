const Category = require('../models/categoryModel');

//get all Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//get a single Category
const getCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        if(!category) {
            return res.status(404).json({message: `Cannot find any category with ID ${id}`});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// create a category
const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Update a category
const updateCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const category = await Product.findByIdAndUpdate(id, req.body, {new: true});
        if(!category) {
            return res.status(404).json({message: `Cannot find any category with ID ${id}`});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: `Cannot find any category with ID ${id}` });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
