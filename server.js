require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
var cors = require('cors');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

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

// Load the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Serve custom CSS
app.use('/swagger-ui.css', express.static(path.join(__dirname, 'custom.css')));

// Serve Swagger documentation with custom CSS
const swaggerOptions = {
  customCssUrl: '/swagger-ui.css',
  customSiteTitle: "Authenticator API Docs"
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Routes
app.use('/api', indexRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('API is healthy');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);
app.use(loggingMiddleware);

// Database connection and server start
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        app.listen(process.env.PORT || 6000, () => {
            console.log(`Node API app is running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch(error => {
        console.log(error);
    });