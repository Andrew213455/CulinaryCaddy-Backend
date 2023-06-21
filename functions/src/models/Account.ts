import { ObjectId } from "mongodb";

interface Recipe {
  id: string;
  title: string;
  instructions: string;
  image: string;
}

export default interface Account {
  _id: ObjectId;
  googleId?: string;
  name: string;
  favorites: Recipe[];
  photoURL: string;
}
