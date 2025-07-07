const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserBy,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/', getAllUsers)

router.get('/:id', getUserBy)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router