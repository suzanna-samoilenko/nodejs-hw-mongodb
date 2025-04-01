import express from 'express';
import contactRouter from './contacts.js';
import authRouter from './auth.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/contacts', auth, contactRouter);

export default router;
