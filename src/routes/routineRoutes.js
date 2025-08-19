const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const {
    getAllRoutines,
    getRoutineById,
    getRoutineByUser,
    createRoutine,
    updateRoutine,
    deleteRoutine
}  = require('../controllers/routineController.js');

router.get('/', auth, getAllRoutines);

router.get('/:id', auth, getRoutineById);

router.get('/usuario/:id', auth, getRoutineByUser);

router.post('/', auth, createRoutine);
router.put('/:id', auth, updateRoutine);
router.delete('/:id', auth, deleteRoutine);

module.exports = router;
