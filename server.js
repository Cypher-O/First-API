const express = require('express')
const mongoose = require('mongoose')
const Product = require("./models/productModel")
const app = express()

//Middle ware to understand JSON
app.use(express.json())

//Middleware to understand forma-data
app.use(express.urlencoded({extended: false}))

//routes
app.get('/', (req, res) => {
    res.send('Hello NODE API')
})


app.get('/blog', (req, res) => {
    res.send('Hello Blog this is just a test')
})

app.get("/products",async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post("/products", async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        //Cannot find product in the database
        if(!product) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// mongoose.set("strictQuery", false)
mongoose.
connect("mongodb+srv://admin:%21Cypher%3Ecodegod2001%3F@cypherapi.dkga4mx.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=CypherAPI")
.then(() => {
    console.log("Connected to MongoDB successfully")
    app.listen(3000, () => {
        console.log('Node API app is running on port 3000')
    })
}). catch ((error) => {
    console.log(error)
})