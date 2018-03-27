import mongoose from "mongoose";
const Schema = mongoose.Schema;

let userSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date
});

userSchema.methods.createUser = async function() {
  return new Promise((resolve, reject) => {
    let duplicateUserName = User.findOne({ name: this.name });
    let duplicateUserEmail = User.findOne({ email: this.email });
    Promise.all([duplicateUserName, duplicateUserEmail])
      .then(async res => {
        console.log("res", res);
        if (!res[0] && !res[1]) {
          await this.save();
          resolve(this);
        } else reject("user/email already exists");
      })
      .catch(err => {
        console.log(err);
        reject("something wrong");
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
