const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
    getAllRoutines,
    getRoutineById,
    getRoutineByUser,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutinesSearch
}  = require('../controllers/routineController.js');

router.get('/', verifyToken, getAllRoutines);

router.get('/:id', verifyToken, getRoutineById);

router.get('/usuario/:id', verifyToken, getRoutineByUser);

router.post('/', verifyToken, createRoutine);
router.put('/:id', verifyToken, updateRoutine);
router.delete('/:id', verifyToken, deleteRoutine);

module.exports = router;
