const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

// Route: POST /api/users/contact
router.post('/contact', submitContact);

module.exports = router;
