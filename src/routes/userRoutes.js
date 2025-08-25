const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
    getAllUsers,
    getUserBy,
    createUser,
    updateUser,
    deleteUser,
    getDays,
    getUsersSearch
} = require('../controllers/userController');

router.get('/', verifyToken, getAllUsers);

router.post('/search', verifyToken, getUsersSearch)

router.get('/dias-restantes', verifyToken, getDays);

router.get('/:id', verifyToken, getUserBy);

router.post('/', verifyToken, createUser);

router.put('/:id', verifyToken, updateUser);

router.delete('/:id', verifyToken, deleteUser);

module.exports = router;