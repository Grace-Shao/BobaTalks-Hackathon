import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  currentMoney: {
    type: Number,
    min: 0,
    default: 0,
  },
  goalAmount: {
    type: Number,
    required: true,
    min: 1,
  },
  organizerIds: [
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