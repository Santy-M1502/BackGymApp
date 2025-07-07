const express = require('express');
const router = express.Router();

const {
    getAllExercises,
    getExerciseBy,
    createExercise,
    updateExercise,
    deleteExercise
}  = require('../controllers/exerciseController.js') 

router.get('/', getAllExercises)

router.get('/:id', getExerciseBy)

router.post('/', createExercise)

router.put('/:id', updateExercise)

router.delete('/:id', deleteExercise)

module.exports = router