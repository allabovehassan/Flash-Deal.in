const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    pass: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("UsersData", userSchema);
module.exports = { userModel };
