const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello NODE API');
});

router.get('/blog', (req, res) => {
    res.send('Hello Blog this is just a test');
});

module.exports = router;
