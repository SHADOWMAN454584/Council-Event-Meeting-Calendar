import express from 'express';
import { body, validationResult } from 'express-validator';
import Meeting from '../models/Meeting.js';
import { protect, isSecretaryOrConvenor, isMember } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/meetings
// @desc    Get all meetings (only for members, secretary, convenor)
// @access  Private (Members only)
router.get('/', protect, isMember, async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    let query = {};

    // Filter by date range if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    const meetings = await Meeting.find(query)
      .populate('createdBy', 'name email role')
      .populate('lastModifiedBy', 'name email role')
      .populate('attendees', 'name email role')
      .sort({ date: 1 });

    res.json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/meetings/:id
// @desc    Get single meeting by ID
// @access  Private (Members only)
router.get('/:id', protect, isMember, async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate('createdBy', 'name email role')
      .populate('lastModifiedBy', 'name email role')
      .populate('attendees', 'name email role');

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/meetings
// @desc    Create a new meeting
// @access  Private (Secretary or Convenor only)
router.post('/', [
  protect,
  isSecretaryOrConvenor,
  body('title').notEmpty().withMessage('Meeting title is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('startTime').notEmpty().withMessage('Start time is required'),
  body('endTime').notEmpty().withMessage('End time is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      agenda,
      attendees,
      status,
      isRecurring,
      recurringPattern,
    } = req.body;

    const meeting = await Meeting.create({
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      agenda,
      attendees: attendees || [],
      status: status || 'scheduled',
      isRecurring: isRecurring || false,
      recurringPattern: recurringPattern || 'none',
      createdBy: req.user.id,
    });

    const populatedMeeting = await Meeting.findById(meeting._id)
      .populate('createdBy', 'name email role')
      .populate('attendees', 'name email role');

    res.status(201).json({
      success: true,
      data: populatedMeeting,
      message: 'Meeting created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/meetings/:id
// @desc    Update a meeting
// @access  Private (Secretary or Convenor only)
router.put('/:id', [
  protect,
  isSecretaryOrConvenor,
  body('title').optional().notEmpty().withMessage('Meeting title cannot be empty'),
  body('date').optional().isISO8601().withMessage('Valid date is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    const {
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      agenda,
      attendees,
      status,
      isRecurring,
      recurringPattern,
    } = req.body;

    meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        startTime,
        endTime,
        location,
        agenda,
        attendees,
        status,
        isRecurring,
        recurringPattern,
        lastModifiedBy: req.user.id,
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email role')
     .populate('lastModifiedBy', 'name email role')
     .populate('attendees', 'name email role');

    res.json({
      success: true,
      data: meeting,
      message: 'Meeting updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/meetings/:id
// @desc    Delete a meeting
// @access  Private (Secretary or Convenor only)
router.delete('/:id', protect, isSecretaryOrConvenor, async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    await Meeting.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Meeting deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
