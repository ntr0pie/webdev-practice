// Requirements
const express = require('express');
const generateImage = require('../controllers/oaiController');

// Router
const router = express.Router()
router.post('/generateImage', generateImage)

module.exports = router;