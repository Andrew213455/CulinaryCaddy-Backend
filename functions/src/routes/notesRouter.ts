import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Note from "../models/Note";

const notesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

notesRouter.get("/notes/:accountId/:recipeId", async (req, res) => {
  try {
    const _id: string = req.params.recipeId;
    const accountId: ObjectId = new ObjectId(req.params.accountId);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Note>("notes")
      .find({ recipeId: _id, accountId: accountId })
      .toArray();
    res.status(200);
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

notesRouter.post("/notes", async (req, res) => {
  const newNote: Note = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Note>("notes").insertOne(newNote);
    res.status(201).json(newNote);
  } catch (err) {
    errorResponse(err, res);
  }
});

// notesRouter.put("/users/:id", async (req, res) => {
//   try {
//     const _id: ObjectId = new ObjectId(req.params.id);
//     const updatedUser: Account = req.body;
//     const client = await getClient();
//     const result = await client
//       .db()
//       .collection<Account>("accounts")
//       .replaceOne({ _id }, updatedUser);
//     if (result.matchedCount) {
//       res.status(200);
//       res.json(updatedUser);
//     } else {
//       res.status(404);
//       res.send("User not found");
//     }
//   } catch (err) {
//     errorResponse(err, res);
//   }
// });

notesRouter.delete("/notes/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Note>("notes")
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

// notesRouter.patch("/fave/add/:id", async (req, res) => {
//   try {
//     const id: string = req.params.id;
//     const newFavorite: Recipe = req.body;
//     const client = await getClient();
//     const result = await client
//       .db()
//       .collection<Account>("accounts")
//       .updateOne({ googleId: id }, { $push: { favorites: newFavorite } });
//     const updatedAccount: Account | null = await client
//       .db()
//       .collection<Account>("accounts")
//       .findOne({ googleId: id });
//     if (result.matchedCount) {
//       res.status(200);
//       res.json(updatedAccount);
//     } else {
//       res.status(404);
//       res.send("User not found");
//     }
//   } catch (err) {
//     errorResponse(err, res);
//   }
// });

export default notesRouter;
