import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Meeting title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Meeting date is required'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
  },
  location: {
    type: String,
    trim: true,
  },
  agenda: {
    type: String,
    trim: true,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringPattern: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'none'],
    default: 'none',
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
meetingSchema.index({ date: 1 });

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
