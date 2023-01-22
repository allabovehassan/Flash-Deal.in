const express = require("express");
const carRoute = express.Router();
const { carModel } = require("../models/cars");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drzmowsgg",
  api_key: "688111654221173",
  api_secret: "41aJg5n6qdEMvTqpu7d0qg32gXM",
  secure: true,
});


carRoute.get("/", async (req, res) => {
  try {
    let data = await carModel.find();
    res.send(data);
  } catch (error) {
    res.send({"message":error.message});
  }
});



carRoute.get("/myads/:id", async (req, res) => {
  let ID = req.params.id
  try {
    
    let data = await carModel.find({userID:ID})
    res.send(data)
    console.log(data)
  } catch (error) {
    res.send({message:error.message})
  }
})


carRoute.post("/add", async (req, res) => {
  let payload = req.body;
  try {
    const mobiledata = new carModel(payload);
    await mobiledata.save();
    
    // const file = req.files.photo;
    // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //   console.log(result);
    // })


    res.send({ message: "Veichle Ad Created" });
  } catch (error) {
    console.log(error.message);
    res.send(`Something Wrong not added`);
  }
});

carRoute.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let ID = req.params.id;
  try {
    let find_id = await carModel.findOne({ _id: ID });
    if (find_id.userID === payload.userID) {
      await carModel.findByIdAndUpdate({ _id: ID }, payload);
      // res.send(`Updated`);
      res.send({ message: "Vechile Ad Updated" });
    } else {
      res.send(`U r not allowed to do modification`);
    }
  } catch (error) {
    console.log(`Eroor while updating`);
    res.send(error.message);
  }
});

carRoute.delete("/delete/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body;
  try {
    let delete_obj = await carModel.findOne({ _id: ID });
    // console.log();
    if (delete_obj.userID === payload.userID) {
      await carModel.findByIdAndDelete({ _id: ID });
      res.send({ message: "Veichle Ad Deleted" });
    } else {
      // let ans = JSON.stringify("U R not allowed delete someone else task")
      res.send({ message: "U r not allowed delete someone else task " });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = { carRoute };
