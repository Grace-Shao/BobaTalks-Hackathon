import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();
import db from "../db/conn.mjs";

/**
 * Fetches all events that the user should be able to see
 */
router.get("/", async (req, res) => {
  let collection = await db.collection("events");

  // Get today's date
  let today = new Date();
  // Reset hours, minutes, seconds and milliseconds to make it start of the day
  today.setHours(0, 0, 0, 0);

  let results = await collection
    .find({
      // Check current money is less than target money
      $expr: { $lt: ["$current_money", "$target_money"] },
      // Check if deadline is after today
      deadline: {
        $gt: today.toISOString(), // Use ISO string for date comparison
      },
    })
    .toArray();

  res.status(200).send(results);
});

/**
 * Get a single event by ID
 */
router.get("/:id", async (req, res) => {
  let collection = await db.collection("events");
  let query = { _id: ObjectId.createFromHexString(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

/**
 * Adds a new document to the collection
 */
router.post("/", async (req, res) => {
  const { current_money, target_money, event_name, event_owner, deadline } =
    req.body;

  // Validate current_money is non-negative
  if (
    current_money === undefined ||
    typeof current_money !== "number" ||
    current_money < 0
  ) {
    return res
      .status(400)
      .send({ error: "current_money must be a non-negative number" });
  }

  // Validate target_money is greater than 0
  if (
    target_money === undefined ||
    typeof target_money !== "number" ||
    target_money <= 0
  ) {
    return res
      .status(400)
      .send({ error: "target_money must be greater than 0" });
  }

  // Validate event_owner
  if (typeof event_owner !== "string" || event_owner.trim() === "") {
    return res
      .status(400)
      .send({ error: "event_owner must be a non-empty string" });
  }

  // Validate deadline as a date
  if (isNaN(Date.parse(deadline))) {
    return res.status(400).send({ error: "deadline must be a valid datetime" });
  }

  let newDocument = {
    current_money,
    target_money,
    event_name,
    event_owner,
    deadline: new Date(deadline),
  };

  let collection = await db.collection("events");
  let result = await collection.insertOne(newDocument);

  res.status(201).send(result);
});

/**
 * Edit an existing event
 */
router.put("/:id", async (req, res) => {
  const collection = db.collection("events");
  const eventId = req.params.id;
  const { current_money, target_money, event_owner, deadline } = req.body;

  const originalEvent = await collection.findOne({ _id: ObjectId(eventId) });
  if (!originalEvent) {
    return res.status(404).send({ error: "Event to edit not found" });
  }

  // Validate event_owner
  if (typeof event_owner !== "string" || event_owner.trim() === "") {
    return res
      .status(400)
      .send({ error: "event_owner must be a non-empty string" });
  }

  if (event_owner !== originalEvent.event_owner) {
    return res.status(400).send({ error: "Cannot change the event owner" });
  }

  // Validate current_money is non-negative
  if (
    current_money === undefined ||
    typeof current_money !== "number" ||
    current_money < 0
  ) {
    return res
      .status(400)
      .send({ error: "current_money must be a non-negative number" });
  }

  // Validate target_money is greater than 0
  if (
    target_money === undefined ||
    typeof target_money !== "number" ||
    target_money <= 0
  ) {
    return res
      .status(400)
      .send({ error: "target_money must be greater than 0" });
  }

  // Validate deadline as a date
  if (isNaN(Date.parse(deadline))) {
    return res.status(400).send({ error: "deadline must be a valid datetime" });
  }

  // Perform the update if all validations pass
  const update = { $set: req.body };
  const result = await collection.updateOne({ _id: ObjectId(eventId) }, update);

  if (result.modifiedCount === 0) {
    return res.status(500).send({ error: "Update failed" });
  }

  res.status(200).send({ message: "Event updated successfully" });
});

/**
 * Delete an event
 */
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: ObjectId.createFromHexString(req.params.id) };
    const collection = db.collection("events");

    // First check if the event actually exists. If it does, delete it
    const event = await collection.findOne(query);
    if (!event) {
      // If no event is found, return a 404 not found error
      return res.status(404).send({ message: "Event not found." });
    }
    let result = await collection.deleteOne(query);

    // Check if the delete operation was successful
    if (result.deletedCount === 0) {
      // If no records were deleted
      return res.status(404).send({ message: "No event found to delete." });
    }
    res.status(200).send({ message: "Event deleted successfully." });
  } catch (error) {
    // General error handling
    console.error("Failed to delete event:", error);
    res
      .status(500)
      .send({
        message: "Failed to delete event due to internal server error.",
      });
  }
});

export default router;
