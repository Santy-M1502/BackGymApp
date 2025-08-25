const express = require('express');
const router = express.Router();

const {
    login,
    register,
    refresh,
    logout
} = require('../controllers/authController.js');

router.post('/login', login);
router.post('/register', register);
router.post('/refresh', refresh)
router.post('/logout', logout)

module.exports = router