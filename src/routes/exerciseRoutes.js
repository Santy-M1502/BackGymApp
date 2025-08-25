const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
    getAllExercises,
    getExerciseBy,
    createExercise,
    updateExercise,
    deleteExercise,
    getExercisesSearch
}  = require('../controllers/exerciseController.js') 

router.get('/', verifyToken, getAllExercises)

router.get('/:id', verifyToken, getExerciseBy)

router.post('/search', verifyToken, getExercisesSearch)

router.post('/', verifyToken, createExercise)

router.put('/:id', verifyToken, updateExercise)

router.delete('/:id', verifyToken, deleteExercise)

module.exports = router