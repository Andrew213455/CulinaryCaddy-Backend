import express from "express";
import { getClient } from "../db";
import Account from "../models/Account";
import { ObjectId } from "mongodb";
import Recipe from "../models/Recipe";

const accountRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

accountRouter.get("/accounts", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Account>("accounts").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

accountRouter.get("/accounts/:id", async (req, res) => {
  try {
    const _id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .findOne({ googleId: _id });

    res.status(200);
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

accountRouter.post("/accounts", async (req, res) => {
  const newAccount: Account = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Account>("accounts").insertOne(newAccount);
    res.status(201).json(newAccount);
  } catch (err) {
    errorResponse(err, res);
  }
});

accountRouter.put("/users/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const updatedUser: Account = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .replaceOne({ _id }, updatedUser);
    if (result.matchedCount) {
      res.status(200);
      res.json(updatedUser);
    } else {
      res.status(404);
      res.send("User not found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

accountRouter.delete("/users/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
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

accountRouter.patch("/users/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const newFavorite: Recipe = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .updateOne({ googleId: id }, { $push: { favorites: newFavorite } });
    const updatedAccount: Account | null = await client
      .db()
      .collection<Account>("accounts")
      .findOne({ googleId: id });
    if (result.matchedCount) {
      res.status(200);
      res.json(updatedAccount);
    } else {
      res.status(404);
      res.send("User not found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

accountRouter.patch("/users/favorites/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const favoriteToDelete: Recipe = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .updateOne({ googleId: id }, { $pull: { favorites: favoriteToDelete } });
    const updatedAccount: Account | null = await client
      .db()
      .collection<Account>("accounts")
      .findOne({ googleId: id });
    if (result.matchedCount) {
      res.status(200);
      res.json(updatedAccount);
    } else {
      res.status(404);
      res.send("User not found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default accountRouter;
