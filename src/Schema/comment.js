import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { userSchema } from "./user";

let commentSchema = new Schema({
  text: String,
  user: userSchema,
  date: Date
});

let Comment = mongoose.model("Comment", commentSchema);

export { Comment, commentSchema };
