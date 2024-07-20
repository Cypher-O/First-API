const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a valid product name"]
        },
        description: {
            type: String,
            required: [true, "Please enter a description of your product"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema);

module.exports = Product;