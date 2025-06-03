import Event from '../models/Events.js';
import jwt from 'jsonwebtoken';

// Middleware to extract user from token
const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

export const createEvent = async (req, res) => {
  const user = getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: Login required' });
  }

  const { title, description, date } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      createdBy: user.id, // still storing the creator
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event' });
  }
};


// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};
