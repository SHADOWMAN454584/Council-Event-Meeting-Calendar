import express from 'express';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (for secretary/convenor to manage)
// @access  Private (Secretary or Convenor only)
router.get('/', protect, authorize('secretary', 'convenor'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/users/members
// @desc    Get all members (for adding to meetings)
// @access  Private
router.get('/members', protect, async (req, res) => {
  try {
    const members = await User.find({ 
      role: { $in: ['member', 'secretary', 'convenor'] },
      isActive: true,
    }).select('name email role');

    res.json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user (for profile updates or admin changes)
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Users can only update their own profile unless they're secretary/convenor
    if (req.user.id !== req.params.id && !['secretary', 'convenor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    const { name, phone, isActive, role } = req.body;

    // Only secretary/convenor can change roles and active status
    if ((role || isActive !== undefined) && !['secretary', 'convenor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to change role or active status' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, isActive, role },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
