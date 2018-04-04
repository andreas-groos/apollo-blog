import mongoose from "mongoose";
const Schema = mongoose.Schema;
import shortid from "shortid";
import { commentSchema } from "./comment";
import Author from "./author";

let postSchema = new Schema({
  id: String,
  authorName: String,
  title: String,
  blogText: String,
  likes: Number,
  comments: [commentSchema],
  createdAt: Date,
  updatedAt: Date
});

postSchema.methods.createPost = async function() {
  return new Promise(async (resolve, reject) => {
    if (this.title.length === 0 || this.blogText.length === 0) {
      throw "title and text are necessary";
    }
    // let author = await Author.findOne({ name: this.authorName });
    // if (author) {
    this.id = shortid.generate();
    this.likes = 0;
    this.comments = [];
    // author.postsID.push({ id: this.id });
    // await author.save();
    await this.save();
    resolve(this);
    // }
    // else {
    //   reject("author doesn't exist");
    // }
  });
};
postSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

let Post = mongoose.model("Post", postSchema);

export default Post;
