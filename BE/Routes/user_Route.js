const express = require("express");
const router = express.Router();
const { userModel } = require("../Models/register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.get("/", (req, res) => {
  res.send(`data Page`);
});

// router.get("/data", async (req, res) => {
//   let token = req.headers.token;
//   let data = await userModel.find({});
//   try {
//     jwt.verify(token, "hassan", (err, decoded) => {
//       err ? res.send(`Invalid Token`) : res.send(data);
//     });
//   } catch (error) {
//     console.log({ Error: error.message });
//     res.send(`error`);
//   }
// });

// router.patch("/update/:id", async (req, res) => {
//   let token = req.headers.token;
//   let info = req.body;
//   let ID = req.params.id;
//   try {
//     jwt.verify(token, "hassan", async (err, decoded) => {
//       if (err) res.send(`Invalid Token`);
//       else {

//         // let find_id = await userModel.find(userID)
//         // console.log(find_id)
//         let data = await userModel.findByIdAndUpdate({ _id: ID }, info);
//         res.send("updated" + data);
//       }
//     });
//   } catch (error) {
//     console.log({ Error: error.message });
//     res.send(error);
//   }
// });

// router.delete("/delete/:id", async (req, res) => {
//   let token = req.headers.token;
//   let ID = req.params.id;
//   try {
//     jwt.verify(token, "hassan", async (err, decoded) => {
//       if (err) res.send(`Invalid Token`);
//       else {
//         let data = await userModel.findByIdAndDelete({ _id: ID });
//         res.send("deleted" + data);
//       }
//     });
//   } catch (error) {
//     console.log({ Error: error.message });
//     res.send(error);
//   }
// });

router.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, +process.env.saltround, async (err, hashpas) => {
      if (err) {
        console.log(err);
      } else {
        const user = new userModel({ email, pass: hashpas, name, age });
        let ans = await user.save();
        res.send({ message: "Resgistered" });
      }
    });
  } catch (error) {
    console.log({ Error: error.message });
    res.send({ Error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.find({ email });
    // console.log(user);
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "hassan");
          res.send({ message: "Login Sucessfull", token: token });
        } else {
          res.send({ message: "Wrong Credentials" });
        }
    });
    } else {
    res.send({ message: "Wrong Credentials" });
    
    }
  } catch (error) {
      console.log({ Error: error.message });
      res.send({Error:error.message})
  }
});

module.exports = { router };
