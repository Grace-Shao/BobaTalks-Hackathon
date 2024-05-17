import express from "express";
import User from '../models/User.mjs';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    const result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
