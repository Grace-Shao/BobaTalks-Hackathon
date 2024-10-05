import express from "express";
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import passport from "../config/passport.js";

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

      req.login(user, (err) => {
        if (err) {
          return res.status(500).send({ msg: 'Error logging in after signup' });
        }
        return res.status(201).json({ msg: 'User registered successfully' });
      })
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
  async (req, res, next) => {
    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ msg: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        // Successful login
        return res.status(200).json({ 
          msg: 'Login successful',
          user: {
            email: user.email,
            role: user.role,
          }
         });
      })
    })(req, res, next);
  });

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @returns {object} - User logged out
 */
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: 'Error logging out' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: 'Error logging out - destroying session' });
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.status(200).json({ msg: 'User logged out' });
    });
  });
  });

export default router;
