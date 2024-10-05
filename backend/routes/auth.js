import express from "express";
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @route POST /api/auth/signup
 * @desc Register a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {object} - User registered successfully
 */
router.post(
  '/signup', 
  [
    body('email').isEmail().withMessage('Enter a valid email'),
  ],
  async (req, res) => {
    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ email, password });
      const result = await user.save();

      res
      .status(201)
      .json({ msg: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
  });

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {object} - Login successful
 */
router.post(
  '/login', 
  [
    body('email').isEmail().withMessage('Enter a valid email'),
  ],
  async (req, res) => {
    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).send('Invalid credentials');
      }

      const isMatch = await user.comparePasswords(password);
      if (!isMatch) {
        return res.status(401).send('Invalid credentials');
      }

      res
        .status(200)
        .json({ msg: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error logging in');
    }
  });

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @returns {object} - User logged out
 */
router.post('/logout', (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ msg: 'User logged out' });
  });

export default router;
