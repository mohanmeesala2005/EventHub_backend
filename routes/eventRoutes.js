import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js';

const router = express.Router();

// Public route - anyone can see events
router.post('/getevent', getAllEvents);

router.post('/create', createEvent);

export default router;
