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
  if (typeof event_name !== "string" || event_name.trim() === "") {
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
  const query = { _id: ObjectId.createFromHexString(req.params.id) };
  const update = { $set: req.body };
  console.log(update);
  console.log(query);

  let result = await collection.updateOne(query, update);

  console.log(result);
});

/**
 * Delete an event
 */
router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId.createFromHexString(req.params.id) };

  const collection = db.collection("events");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
