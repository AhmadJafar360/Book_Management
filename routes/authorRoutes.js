const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const authMiddleware = require('../middleware/authmiddleware');

// Public
router.get('/', authorController.getAuthors);

// Protected
router.post('/', authMiddleware, authorController.createAuthor);

module.exports = router;
