const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const {
    getAllHistorys,
    getHistoryBy,
    createHistory,
    updateHistory,
    deleteHistory
}  = require('../controllers/historyController.js')

router.get('/', auth, getAllHistorys)

router.get('/:id', auth, getHistoryBy)

router.post('/', auth, createHistory)

router.put('/:id', auth, updateHistory)

router.delete('/:id', auth, deleteHistory)

module.exports = router