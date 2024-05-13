import express from "express"
const router = express.Router()
import db from "../db/conn.mjs";

/**
 * Fetches all events
 */
router.get('/', async (req, res) => {
  let collection = await db.collection("events")
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

/**
 * Get a single event by ID
 */
router.get("/:id", async (req, res) => {
  let collection = await db.collection("events");
  let query = {_id: ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

/**
 * Adds a new document to the collection
 */
router.post("/", async (req, res) => {
  let collection = await db.collection("events");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


/**
 * Update an existing document
 */
router.patch("/comment/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $push: { comments: req.body }
  };

  let collection = await db.collection("events");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

/**
 * Delete an event
 */
router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  const collection = db.collection("events");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router
