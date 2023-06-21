import { ObjectId } from "mongodb";
import Recipe from "./Recipe";

export default interface Account {
  _id: ObjectId;
  googleId?: string;
  name: string;
  favorites: Recipe[];
  photoURL: string;
}
