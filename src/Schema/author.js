import mongoose from "mongoose";
const Schema = mongoose.Schema;

let authorSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  postsID: [{ id: String }]
});

authorSchema.methods.createAuthor = async function(name, email) {
  return new Promise((resolve, reject) => {
    console.log("this", this);
    if (this.email.length === 0 || this.name.length === 0) {
      throw "email and name are necessary";
    }
    Promise.all([
      Author.findOne({ name: this.name }),
      Author.findOne({ email: this.email })
    ])
      .then(async res => {
        //   Check for duplicates
        if (!res[0] && !res[1]) {
          this.postsID = [];
          await this.save();
          resolve(this);
        } else throw "email/name already exists";
      })
      .catch(err => {
        reject(err);
      });
  });
};
authorSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

let Author = mongoose.model("Author", authorSchema);

export default Author;
