import express from 'express';
import uploads from '../middlewares/uploads.js';
import authMiddleware from '../middlewares/auth.js';
import { createEvent, getAllEvents, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', authMiddleware, uploads.single('image'), createEvent);
router.post('/getevent', getAllEvents);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;