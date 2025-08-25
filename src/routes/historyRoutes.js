const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const {
    getAllHistorys,
    getHistoryBy,
    createHistory,
    updateHistory,
    deleteHistory
}  = require('../controllers/historyController.js')

router.get('/', verifyToken, getAllHistorys)

router.get('/:id', verifyToken, getHistoryBy)

router.post('/', verifyToken, createHistory)

router.put('/:id', verifyToken, updateHistory)

router.delete('/:id', verifyToken, deleteHistory)

module.exports = router