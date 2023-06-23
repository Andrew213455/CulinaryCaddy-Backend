import { ObjectId } from "mongodb";

export default interface Note {
  _id: ObjectId;
  accountId: ObjectId;
  recipeId: string;
  note: string;
  title: string;
}
