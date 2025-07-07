import {Router} from 'express';

import {
    login,
    logout
} from '../helpers/authController.js';

const router = Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;