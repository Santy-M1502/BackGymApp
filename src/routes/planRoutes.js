const express = require('express');
const router = express.Router();

const {
    getAllPlans,
    getPlanBy,
    createPlan,
    updatePlan,
    deletePlan
}  = require('../controllers/planController.js')

router.get('/', getAllPlans)

router.get('/:id', getPlanBy)

router.post('/', createPlan)

router.put('/:id', updatePlan)

router.delete('/:id', deletePlan)

module.exports = router