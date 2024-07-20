// const notFound = (req, res, next) => {
//     const error = new Error(`Not Found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
// };


// module.exports = notFound;

const path = require('path');

const notFound = (req, res, next) => {
    res.status(404);
    res.sendFile(path.join(__dirname, '..', 'views', '404', 'index.html'));
};

module.exports = notFound;
