import mongoose from "mongoose";
const Schema = mongoose.Schema;

let postSchema = new Schema({
  id: Number,
  authorName: String,
  title: String,
  date: Date,
  blogText: String,
  likes: Number
});

let userSchema = new Schema({
  id: Number,
  name: String,
  email: String
});

let authorSchema = new Schema({
  id: Number,
  name: String,
  posts: [postSchema]
});

let commentSchema = new Schema({
  text: String,
  date: Date
});

let Author = mongoose.model("Author", authorSchema);
let User = mongoose.model("User", userSchema);
let Post = mongoose.model("Post", postSchema);
let Comment = mongoose.model("Comment", commentSchema);

export { Author, User, Post, Comment };
