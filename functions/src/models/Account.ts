import { ObjectId } from "mongodb";

export default interface Account {
  id?: ObjectId;
  name: string;
  favorites: string[];
  allergy: string;
  photoURL: string;
}
