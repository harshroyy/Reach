const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const protect = require('../middleware/auth'); // Import the Security Guard

// POST /api/requests
// Uses 'protect' because you must be logged in to ask for help
router.post('/', protect, requestController.createRequest);

// PUT /api/requests/:id/accept
// Uses 'protect' because you must be logged in to accept
router.put('/:id/accept', protect, requestController.acceptRequest);

module.exports = router;