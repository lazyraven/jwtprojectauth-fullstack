const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    credentials: true,
    // origin: ['*'] // allow all orgin
    origin: ["http://localhost:4200"],
  })
);

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/jwtproject", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
    app.listen(5000, () => {
      console.log("App is listening on port 5000");
    });
  });
