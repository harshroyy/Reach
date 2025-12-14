const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const protect = require('../middleware/auth');

// GET /api/matches/:id
router.get('/:id', protect, matchController.getMatchById);

module.exports = router;
