const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = Router();

router.post("/register", async (req, res) => {
  // res.send("created user");
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const record = await User.findOne({ email: email });

  if (record) {
    return res.status(400).send({ message: "Email is already registered" });
  } else {
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      // password: password,
    });

    const result = await user.save();
    res.json({
      user: result,
    });
  }
});

router.post("/login", async (req, res) => {
  res.send("login user");
});

router.get("/user", async (req, res) => {
  res.send("get user");
});

module.exports = router;
