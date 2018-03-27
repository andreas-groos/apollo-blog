import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "./user";

let postSchema = new Schema({
  id: Number,
  authorName: String,
  title: String,
  date: Date,
  blogText: String,
  likes: Number,
  createdAt: Date,
  updatedAt: Date
});

let authorSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  posts: [postSchema]
});

let commentSchema = new Schema({
  text: String,
  date: Date
});

postSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

authorSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

let Post = mongoose.model("Post", postSchema);
let Author = mongoose.model("Author", authorSchema);
let Comment = mongoose.model("Comment", commentSchema);

export { Author, User, Post, Comment };
