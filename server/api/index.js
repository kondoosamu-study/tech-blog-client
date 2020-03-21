const express = require('express');

const router = express.Router();


router.get('/category/ranking', (req, res) => {
    res.send('OK');
})

module.exports = router;