import express from 'express';
import contactRouter from './contacts.js';

const router = express.Router();

router.use('/contacts', contactRouter);

export default router;
