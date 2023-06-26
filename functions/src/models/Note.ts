import { ObjectId } from "mongodb";

export default interface Note {
  _id: ObjectId;
  accountId: string;
  recipeId: string;
  note: string;
  title: string;
}
