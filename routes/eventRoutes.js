import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);          // Public route
router.post('/', createEvent);          // Protected (admin only)

export default router;
