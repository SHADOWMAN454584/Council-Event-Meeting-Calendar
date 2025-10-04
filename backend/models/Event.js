import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  time: {
    type: String,
    required: [true, 'Event time is required'],
  },
  location: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ['event', 'workshop', 'seminar', 'conference', 'other'],
    default: 'event',
  },
  isPublic: {
    type: Boolean,
    default: true, // Public events visible to all users
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Index for efficient date queries
eventSchema.index({ date: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;
