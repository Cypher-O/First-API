require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const indexRoutes = require('./routes/indexRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
var cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://example.com',
    // origin: ['http://example.com', 'http://example.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
   

app.use(cors())
// app.use(cors(corsOptions))


// Middleware to parse JSON and form-data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static('public'));


// Routes
app.use('/api', indexRoutes);
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('API is healthy');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection and server start
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Node API app is running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch(error => {
        console.log(error);
    });



// const express = require('express')
// const mongoose = require('mongoose')
// const Product = require("./models/productModel")
// const app = express()

// const MONGO_URI = process.env.MONGODB_URI
// const PORT = process.env.PORT || 3000

// //Middle ware to understand JSON
// app.use(express.json())

// //Middleware to understand forma-data
// app.use(express.urlencoded({extended: false}))

// //routes
// app.get('/', (req, res) => {
//     res.send('Hello NODE API')
// })


// app.get('/blog', (req, res) => {
//     res.send('Hello Blog this is just a test')
// })

// //find products 
// app.get("/products",async(req, res) => {
//     try {
//         const products = await Product.find({});
//         res.status(200).json(products)
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({message: error.message})
//     }
// })

// //find products by ID
// app.get("/products/:id", async(req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product)
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({message: error.message})
//     }
// })

// //Add products
// app.post("/products", async(req, res) => {
//     try {
//         const product = await Product.create(req.body)
//         res.status(200).json(product);
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({message: error.message})
//     }
// })

// //update a product
// app.put("/products/:id", async(req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body)
//         //Cannot find product in the database
//         if(!product) {
//             return res.status(404).json({message: `Cannot find any product with ID ${id}`})
//         }
//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct)
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({message: error.message})
//     }
// })


// //delate a product
// app.delete('/products/:id', async(req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndDelete(id);
//         if(!product) {
//             return res.status(404).json({message: `Cannot find any product with ID ${id}`})
//         }
//         // res.status(200).json(product)
//         res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({message: error.message})
//     }
// })

// // mongoose.set("strictQuery", false)
// mongoose.
// connect(MONGO_URI)
// .then(() => {
//     console.log("Connected to MongoDB successfully")
//     app.listen(PORT, () => {
//         console.log(`Node API app is running on port ${PORT}`)
//     })
// }). catch ((error) => {
//     console.log(error)
// })