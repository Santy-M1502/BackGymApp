const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const {
    getAllExercises,
    getExerciseBy,
    createExercise,
    updateExercise,
    deleteExercise
}  = require('../controllers/exerciseController.js') 

router.get('/', auth, getAllExercises)

router.get('/:id', auth, getExerciseBy)

router.post('/', auth, createExercise)

router.put('/:id', auth, updateExercise)

router.delete('/:id', auth, deleteExercise)

module.exports = router