const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const app = express();
const fileupload = require("express-fileupload")
const { router } = require("./routes/user_Route");
const { mobileRoute } = require("./routes/mobilerouter");
const { carRoute } = require("./routes/carroute");
const { auth } = require("./Authentication/auth");

app.use(express.json());
app.use(cors());
app.use(fileupload({
  useTempFiles:true
}))
app.use("/user", router);
app.use(auth);
app.use("/mobile", mobileRoute);
app.use("/car", carRoute);

app.get("/", (req, res) => {
  res.send(`Home Page`);
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Connected to DB`);
  } catch (error) {
    console.log({ Error: error.message });
  }
  console.log(`Server is Running at ${process.env.port}`);
});
