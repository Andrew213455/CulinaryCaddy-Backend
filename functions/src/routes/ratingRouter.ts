import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Rating from "../models/Rating";

const ratingRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

ratingRouter.get("/avgRating/:recipeId", async (req, res) => {
  const recipeId: string = req.params.recipeId;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Rating>("ratings")
      .aggregate([
        { $match: { recipeId: recipeId } },
        {
          $group: {
            _id: "$recipeId",
            avgRating: { $avg: "$stars" },
          },
        },
      ])
      .toArray();
    res.status(200);
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

ratingRouter.get("/rating/:recipeId", async (req, res) => {
  try {
    const recipeId: string = req.params.recipeId;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Rating>("ratings")
      .find({ recipeId: recipeId })
      .toArray();
    res.status(200);
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

ratingRouter.post("/rating", async (req, res) => {
  const newRating: Rating = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Rating>("ratings").insertOne(newRating);
    res.status(201).json(newRating);
  } catch (err) {
    errorResponse(err, res);
  }
});

ratingRouter.delete("/rating/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Rating>("ratings")
      .deleteOne({ _id });
    if (result.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("User not found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default ratingRouter;
