import Event from '../models/Events.js';
import EventRegistration from '../models/EventRegistration.js';
import fs, { unlink } from 'fs';
import path from 'path';

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date,cost, createdBy, createdByName, createdByEmail } = req.body;
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path.replace(/\\/g, '/');
    }
    const event = new Event({
      title,
      description,
      date,
      cost,
      createdBy,
      createdByName,
      createdByEmail,
      image: imagePath,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if(event.image){
      const imagePath= path.join(process.cwd(),event.image);
      fs.unlink(imagePath,(err) => {
        if(err){
          console.error('Failed to delete image line:',err);
        }
      })
    }
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateEvent = async(req,res) => {
  try{
   const { title, description, date,cost } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // If a new image is uploaded, delete the old one
    if (req.file) {
      if (event.image) {
        const oldImagePath = path.join(process.cwd(), event.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Failed to delete old image:', err);
        });
      }
      event.image = req.file.path.replace(/\\/g, '/');
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.cost = cost;

    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const registerForEvent = async(req,res) => {
  try{
    const {eventId,name,email,phone} = req.body;
    const registration = new EventRegistration({eventId,name,email,phone});
    await registration.save();
    res.status(201).json({message:'Registerd Successfully'});
  }catch(err){
    res.status(500).json({message:'Registration Failed'});
  }
};

export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const registrations = await EventRegistration.find({ eventId });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
};