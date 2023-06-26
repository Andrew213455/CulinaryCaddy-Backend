import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

import accountRouter from "./routes/accountRouter";
import notesRouter from "./routes/notesRouter";
import ratingRouter from "./routes/ratingRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", accountRouter);
app.use("/", notesRouter);
app.use("/", ratingRouter);
export const api = functions.https.onRequest(app);
