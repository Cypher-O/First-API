require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
var cors = require('cors');

const app = express();

// const crypto = require('crypto');
// console.log(crypto.randomBytes(64).toString('hex'));

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
app.use('/api/auth', authRoutes);

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