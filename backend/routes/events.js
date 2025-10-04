import express from 'express';
import { body, validationResult } from 'express-validator';
import Event from '../models/Event.js';
import { protect, isSecretaryOrConvenor, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events (public events for all users)
// @access  Public/Protected (all authenticated users can see public events)
router.get('/', protect, async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    let query = {};

    // Users can only see public events
    // Members, Secretary, and Convenor can see all events
    if (req.user.role === 'user') {
      query.isPublic = true;
    }

    // Filter by date range if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Filter by type if provided
    if (type) {
      query.type = type;
    }

    const events = await Event.find(query)
      .populate('createdBy', 'name email role')
      .populate('lastModifiedBy', 'name email role')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Protected
router.get('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email role')
      .populate('lastModifiedBy', 'name email role');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user can view this event
    if (event.isPublic === false && req.user.role === 'user') {
      return res.status(403).json({ message: 'Access denied to this event' });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Secretary or Convenor only)
router.post('/', [
  protect,
  isSecretaryOrConvenor,
  body('title').notEmpty().withMessage('Event title is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, date, time, location, type, isPublic } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      type,
      isPublic: isPublic !== undefined ? isPublic : true,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Secretary or Convenor only)
router.put('/:id', [
  protect,
  isSecretaryOrConvenor,
  body('title').optional().notEmpty().withMessage('Event title cannot be empty'),
  body('date').optional().isISO8601().withMessage('Valid date is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, description, date, time, location, type, isPublic } = req.body;

    event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        time,
        location,
        type,
        isPublic,
        lastModifiedBy: req.user.id,
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: event,
      message: 'Event updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Secretary or Convenor only)
router.delete('/:id', protect, isSecretaryOrConvenor, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
