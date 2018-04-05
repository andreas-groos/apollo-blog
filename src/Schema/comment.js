import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { userSchema } from "./user";

let commentSchema = new Schema({
  text: String,
  user: String, // use userSchema maybe?
  date: Date
});

let Comment = mongoose.model("Comment", commentSchema);

export { Comment, commentSchema };
