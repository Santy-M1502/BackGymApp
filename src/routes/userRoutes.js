const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const {
    getAllUsers,
    getUserBy,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/', auth, getAllUsers)

router.get('/:id', auth, getUserBy)

router.post('/', auth, createUser)

router.put('/:id', auth, updateUser)

router.delete('/:id', auth, deleteUser)

module.exports = router