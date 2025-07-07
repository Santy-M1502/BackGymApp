import {Router} from 'express';

const {
    getAllExercises,
    getExerciseBy,
    postExercise,
    putExercise,
    deleteExercise
}  = require('../controllers/exerciseController.js') 

const router = Router();

router.get('/', getAllExercises)

router.get('/:id', getExerciseBy)

router.post('/', postExercise)

router.put('/:id', putExercise)

router.delete('/:id', deleteExercise)

export default router