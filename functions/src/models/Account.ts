import { ObjectId } from "mongodb";
import Recipe from "./Recipe";
import Notes from "./Notes";

export default interface Account {
  _id: ObjectId;
  googleId?: string;
  name: string;
  favorites: Recipe[];
  notes: Notes[];
  photoURL: string;
}
