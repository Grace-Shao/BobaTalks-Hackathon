import express from "express";
import { ObjectId } from "mongodb";
import Event from '../models/Event.mjs';

const router = express.Router();
import db from "../db/conn.mjs";

/**
 * Fetches all events that the user should be able to see
 */
router.get("/", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const results = await Event.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $lt: ["$current_money", "$goal_amount"] },
              { $gte: ["$end_date", today] }
            ]
          }
        }
      }
    ]);
    res.status(200).send(results);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send("Error fetching events");
  }
});

/**
 * Get a single event by ID
 */
router.get("/:id", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(404).send("Please input a username.");
  }

  try {
    const result = await Event.findById(req.params.id); // Mongoose simplifies finding by ID

    if (!result) {
      return res.status(404).send("Not found");
    }

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let endDate = new Date(result.end_date);
    let owner = result.event_owner;

    if (owner !== username) {
      if (endDate < today) {
        return res.status(404).send("The event has passed!");
      } else {
        let currAmt = result.current_money;
        let targetAmt = result.goal_amount;

        if (currAmt >= targetAmt) {
          return res.status(404).send("The target amount has been reached!");
        } else {
          return res.status(200).send(result);
        }
      }
    } else {
      return res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Route encountered an error.");
  }
});

/**
 * Adds a new document to the collection
 */
router.post("/", async (req, res) => {
  const {
    goal_amount, event_name, event_owner, end_date,
    event_description, start_date
  } = req.body;

  // Create a new event instance using Mongoose
  const newEvent = new Event({
    current_money: 0,
    goal_amount,
    event_name,
    event_owner,
    event_description,
    end_date: new Date(end_date),
    start_date: new Date(start_date),
    thank_you_note: []
  });

  try {
    // Save the new event to the database
    const result = await newEvent.save();
    res.status(201).send(result);
  } catch (error) {
    // If Mongoose throws a validation error, catch it and return a 400 bad request
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    } else {
      // For other types of errors, return a 500 internal server error
      return res.status(500).send({ error: 'Internal server error' });
    }
  }
});

/**
 * Edit an existing event
 */
router.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  const { current_money, new_notes } = req.body;

  try {
    const originalEvent = await Event.findById(eventId);
    if (!originalEvent) {
      return res.status(404).send({ error: "Event to edit not found" });
    }

    // Update fields (only if they are provided and valid)
    if (current_money !== undefined) originalEvent.current_money = current_money;

    // Add new notes to event
    for (let note of new_notes) {
      originalEvent.thank_you_note.push(note);
    }

    // Save the updates
    const result = await originalEvent.save();
    res.status(200).send({ message: "Event updated successfully", data: result });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ error: err.message });
    } else {
      console.error("Error updating event:", err);
      res.status(500).send({ error: "Update failed due to internal server error." });
    }
  }
});

/**
 * Delete an event
 */
router.delete("/:id", async (req, res) => {
  try {
    // Find the document by ID and delete it in one operation
    const result = await Event.findByIdAndDelete(req.params.id);

    // Check if an event was actually found and deleted
    if (!result) {
      return res.status(404).send({ message: "Event not found." });
    }

    res.status(200).send({ message: "Event deleted successfully." });
  } catch (error) {
    console.error("Failed to delete event:", error);
    res.status(500).send({
      message: "Failed to delete event due to internal server error.",
    });
  }
});

export default router;
