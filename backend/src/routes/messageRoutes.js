const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const protect = require('../middleware/auth'); 

// POST /api/messages - Send a message
router.post('/', protect, messageController.sendMessage);

// GET /api/messages/:matchId - Get history
router.get('/:matchId', protect, messageController.getMessages);

module.exports = router;