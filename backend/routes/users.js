import express from "express";
import User from '../models/User.js';

const router = express.Router();

/**
 * @route GET /api/users/organizers
 * @desc Get all users with organizer role
 * @returns {Array} - List of organizers
 */
router.get('/organizers', async (req, res) => {
  try {
    const organizers = await User.find(
      { role: 'organizer' },
      'email role' // Only return these fields
    );
    
    res.status(200).json({ organizers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error fetching organizers' });
  }
});

export default router;