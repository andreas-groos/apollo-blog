import mongoose from "mongoose";
const Schema = mongoose.Schema;

let eventSchema = new Schema({
  title: String,
  date: Date
});

let userSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  eventTypes: [String],
  events: [eventSchema]
});

let Event = mongoose.model("Event", eventSchema);
let User = mongoose.model("User", userSchema);

export { Event, User };
