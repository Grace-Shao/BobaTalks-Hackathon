import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
    trim: true,
  },
  event_description: {
    type: String,
    trim: true
  },
  img_url: {
    type: String,
    trim: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  current_money: {
    type: Number,
    min: 0,
    default: 0,
  },
  goal_amount: {
    type: Number,
    required: true,
    min: 1,
  },
  event_owner: {
    type: String,
    required: true,
  },
  organizer_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  donations: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      message: String,
      amount: {
        type: Number,
        required: true,
        min: 1,
      },
      anonymous: { 
        type: Boolean,
        default: false,
      }
    },
  ],
});

const Event = mongoose.model('event', eventSchema);

export default Event;