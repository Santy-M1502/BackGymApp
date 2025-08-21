const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const {
    getAllExercises,
    getExerciseBy,
    createExercise,
    updateExercise,
    deleteExercise,
    getExercisesSearch
}  = require('../controllers/exerciseController.js') 

router.get('/', auth, getAllExercises)

router.get('/:id', auth, getExerciseBy)

router.post('/search', auth, getExercisesSearch)

router.post('/', auth, createExercise)

router.put('/:id', auth, updateExercise)

router.delete('/:id', auth, deleteExercise)

module.exports = router