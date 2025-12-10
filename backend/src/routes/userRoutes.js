const express = require('express');
const router = express.Router();

// Import getHelpers along with register and login
const { 
  registerUser, 
  loginUser, 
  getHelpers 
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/helpers', getHelpers); // <--- New Route for getting helpers

module.exports = router;