import express from 'express';
import contactRouter from './contacts.js';
import authRouter from './auth.js';

const router = express.Router();

router.use('/contacts', contactRouter);
router.use('/auth', authRouter);

export default router;
