const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const routes = require("./router/routes");

const app = express();

// ordering is very much important
app.use(
  cors({
    credentials: true,
    // origin: ['*'] // allow all orgin
    origin: ["http://localhost:4200"],
  })
);

app.use(express.json());

// app.use(routes);

// for adding path
app.use("/api", routes);

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
