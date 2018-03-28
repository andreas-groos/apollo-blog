import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { User } from "./user";
import Author from "./author";
import Post from "./post";
import { Comment } from "./comment";

export { Author, User, Post, Comment };
