const express = require("express");
const mobileRoute = express.Router();
const { mobileModel } = require("../models/mobile");

mobileRoute.get("/", async (req, res) => {
  try {
    let data = await mobileModel.find();
    res.send(data);
  } catch (error) {
     res.send({ message: error.message });
  }
});



mobileRoute.get("/myads/:id", async (req, res) => {
  let ID = req.params.id
  try {
    
    let data = await mobileModel.find({userID:ID})
    res.send(data)
    console.log(data)
  } catch (error) {
    res.send({message:error.message})
  }
})



mobileRoute.post("/add", async (req, res) => {
  let payload = req.body;
  try {
    const mobiledata = new mobileModel(payload);
    await mobiledata.save();
    // res.send(notesdata);
    res.send({ message: "Device Ad Created" });
  } catch (error) {
    console.log(error.message);
    res.send(`Something Wrong not added`);
  }
});

mobileRoute.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let ID = req.params.id;
  try {
    let find_id = await mobileModel.findOne({ _id: ID });
    if (find_id.userID === payload.userID) {
      await mobileModel.findByIdAndUpdate({ _id: ID }, payload);
      // res.send(`Updated`);
      res.send({ message: "Device Ad Updated" });
    } else {
      res.send(`U r not allowed to do modification`);
    }
  } catch (error) {
    console.log(`Eroor while updating`);
    res.send(error.message);
  }
});

mobileRoute.delete("/delete/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body;
  try {
    let delete_obj = await mobileModel.findOne({ _id: ID });
    // console.log();
    if (delete_obj.userID === payload.userID) {
      await mobileModel.findByIdAndDelete({ _id: ID });
      res.send({ message: "Device Ad Deleted" });
    } else {
      // let ans = JSON.stringify("U R not allowed delete someone else task")
      res.send({ message: "U r not allowed delete someone else task " });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = { mobileRoute };
