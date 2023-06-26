import { ObjectId } from "mongodb";

export default interface Rating {
  _id: ObjectId;
  stars: number;
  recipeId: string;
}
