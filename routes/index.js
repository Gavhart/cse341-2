const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
    res.send('Welcome to the Contact Management API');
});

router.use('/contacts', require('./contacts'));

module.exports = router;