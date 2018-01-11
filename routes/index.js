const express = require('express');
const router = express.Router();
const constants = require('../constants');

router.post('/', function(req, res) {
    console.dir(req.body)
    return res.json({ message: 'filelrsasdfasgas' });
});

module.exports = router;
