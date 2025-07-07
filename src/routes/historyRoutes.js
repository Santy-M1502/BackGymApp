const express = require('express');
const router = express.Router();

const {
    getAllHistorys,
    getHistoryBy,
    createHistory,
    updateHistory,
    deleteHistory
}  = require('../controllers/historyController.js')

router.get('/', getAllHistorys)

router.get('/:id', getHistoryBy)

router.post('/', createHistory)

router.put('/:id', updateHistory)

router.delete('/:id', deleteHistory)

module.exports = router