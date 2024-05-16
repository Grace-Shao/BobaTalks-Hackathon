import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  current_money: { type: Number, required: true, min: 0 },
  goal_amount: { type: Number, required: true, min: 1 },
  event_name: { type: String, required: true },
  event_owner: { type: String, required: true },
  event_description: { type: String, required: true },
  end_date: { type: Date, required: true },
  start_date: { type: Date, required: true },
  thank_you_note: [{ type: String }] // Array of strings
});

const Event = mongoose.model('event', eventSchema);

export default Event;