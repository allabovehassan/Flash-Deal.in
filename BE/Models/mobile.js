const mongoose = require("mongoose");

const mobileSchema = mongoose.Schema(
  {
    title: String,
    ram: String,
    brand: String,
    owner: String,
    price: String,
    contact: String,
    img_src:String,
    userID:String
  },
  {
    versionKey: false,
  }
);

const mobileModel = mongoose.model("mobileData", mobileSchema);
module.exports = { mobileModel };
