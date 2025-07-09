const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const {
    getAllPlans,
    getPlanBy,
    createPlan,
    updatePlan,
    deletePlan
}  = require('../controllers/planController.js')

router.get('/', auth, getAllPlans)

router.get('/:id', auth, getPlanBy)

router.post('/', auth, createPlan)

router.put('/:id', auth, updatePlan)

router.delete('/:id', auth, deletePlan)

module.exports = router