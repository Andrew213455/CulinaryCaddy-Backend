import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

import accountRouter from "./routes/accountRouter";
import notesRouter from "./routes/notesRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", accountRouter);
app.use("/", notesRouter);
export const api = functions.https.onRequest(app);
