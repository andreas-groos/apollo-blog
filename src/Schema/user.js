import mongoose from "mongoose";
const Schema = mongoose.Schema;

let userSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date
});

userSchema.methods.createUser = async function(name, email) {
  return new Promise((resolve, reject) => {
    if (this.email.length === 0 || this.name.length === 0) {
      throw "email and name are necessary";
    }
    Promise.all([
      User.findOne({ name: this.name }),
      User.findOne({ email: this.email })
    ])
      .then(async res => {
        //   Check for duplicates
        if (!res[0] && !res[1]) {
          await this.save();
          resolve(this);
        } else throw "email/name already exists";
      })
      .catch(err => {
        reject(err);
      });
  });
};

userSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  console.log("saving....");
  next();
});

let User = mongoose.model("User", userSchema);

export default User;
