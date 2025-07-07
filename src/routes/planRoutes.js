import {Router} from 'express';

import{
    getAllPlans,
    getPlanBy,
    postPlan,
    putPlan,
    deletePlan
}  from '../controllers/planController.js'

const router = Router();

router.get('/', getAllPlans)

router.get('/:id', getPlanBy)

router.post('/', postPlan)

router.put('/:id', putPlan)

router.delete('/:id', deletePlan)

export default router