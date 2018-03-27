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
    Promise.all([
      User.findOne({ name: this.name }),
      User.findOne({ email: this.email })
    ])
      .then(async res => {
        //   Check for duplicates
        if (!res[0] && !res[1]) {
          await this.save();
          resolve(this);
        } else reject("user/email already exists");
      })
      .catch(err => {
        console.log(err);
        reject("something went wrong");
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
