const express = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.token;
  // token=null;
  if (token) {
    const decoded = jwt.verify(token, "hassan", (err, decoded) => {
      if (decoded) {
        // console.log(decoded);
        req.body.userID = decoded.userID;
        req.body.user_name = decoded.user_name;
        req.body.user_email = decoded.user_email;
        req.body.user_age = decoded.user_age;
        // req.body.user_id = decoded.user_id;

        // console.log(req.body.user_name)
        next();
      } else {
        res.send({ message: "kindly Login First" });
      }
    });
  } else {
    res.send({ message: "please Login First" });
    // res.send(` please Login First`);
  }
};

module.exports = { auth };
