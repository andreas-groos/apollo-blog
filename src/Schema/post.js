import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { commentSchema } from "./comment";

let postSchema = new Schema({
  id: Number,
  authorName: String,
  title: String,
  date: Date,
  blogText: String,
  likes: Number,
  comments: [commentSchema],
  createdAt: Date,
  updatedAt: Date
});

postSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

let Post = mongoose.model("Post", postSchema);

export default Post;
