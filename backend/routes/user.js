import express from 'express';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import User from '../models/User.mjs';

const router = express.Router();

// Get all users
router.get('/users', auth, role('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Approve Organizer
router.post('/approve-organizer', auth, role('admin'), async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.role = 'organizer';
      await user.save();
      res.status(200).json({ msg: 'User promoted to organizer' });
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
