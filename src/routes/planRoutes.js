const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
    getAllPlans,
    getPlanBy,
    createPlan,
    updatePlan,
    deletePlan
}  = require('../controllers/planController.js')

router.get('/', verifyToken, getAllPlans)

router.get('/:id', verifyToken, getPlanBy)

router.post('/', verifyToken, createPlan)

router.put('/:id', verifyToken, updatePlan)

router.delete('/:id', verifyToken, deletePlan)

module.exports = router