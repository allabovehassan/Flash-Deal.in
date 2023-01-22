const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    title: String,
    model: String,
    year: String,
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

const carModel = mongoose.model("carData", carSchema);
module.exports = { carModel };
