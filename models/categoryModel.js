const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a valid category name"],
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;