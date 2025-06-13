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

// Create a new event (authenticated users only)
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, createdBy, createdByName, createdByEmail } = req.body;
    const event = new Events({
      title,
      description,
      date,
      createdBy,
      createdByName,
      createdByEmail
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Public - Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};
