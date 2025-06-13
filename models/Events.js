import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  date: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdByName: { type: String, required: true },
  createdByEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Events = mongoose.model('Event', eventSchema);

export default Events;
