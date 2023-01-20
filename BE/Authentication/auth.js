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
