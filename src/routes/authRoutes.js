const express = require('express');
const router = express.Router();

const {
    login,
    logout
} = require('../helpers/authController.js');

router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router