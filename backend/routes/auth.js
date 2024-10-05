import express from "express";
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const router = express.Router();

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

      // Generate JWT
      const payload = { user_id: user._id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })

      res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(201)
      .json({ msg: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
  });

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

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).send('Invalid credentials');
      }
      
      // Generate JWT
      const payload = { userId: user._id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Send token in HTTP-only cookie
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .status(200)
        .json({ msg: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error logging in');
    }
  });

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
