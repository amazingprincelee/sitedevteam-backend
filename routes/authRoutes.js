const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, getAuthenticatedUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getAuthenticatedUser);

module.exports = router;
