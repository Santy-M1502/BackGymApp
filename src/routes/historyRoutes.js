import {Router} from 'express';

import{
    getAllHistorys,
    getHistoryBy,
    postHistory,
    putHistory,
    deleteHistory
}  from '../controllers/historyController.js'

const router = Router();

router.get('/', getAllHistorys)

router.get('/:id', getHistoryBy)

router.post('/', postHistory)

router.put('/:id', putHistory)

router.delete('/:id', deleteHistory)

export default router