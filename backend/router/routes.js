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

  // findOne using for this user already added here or not with this email
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
    // if you want to see result in json format
    // add this line of code 33-35
    // res.json({
    //   user: result,
    // });
    // {
    //   "user": {
    //       "name": "gdfgdfg",
    //       "email": "dfgdfgj@gmail.com",
    //       "password": "$2b$10$nZlDlVJ7.OG3RuojahSG8efs63L/XBp7e2/mGfMtLIVNTnpOTXMN.",
    //       "_id": "6808588d1b5df5ca2486a7ed",
    //       "__v": 0
    //   }
    // }

    // after generate id created token
    const { _id } = await result.toJSON();

    const token = jwt.sign({ _id: _id }, "secret");
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send({ message: "Success" });
    // res.json({
    //   user: result,
    // });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({
      message: "User not Found",
    });
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "Password is Incorrect",
    });
  }

  const token = jwt.sign({ _id: user_id }, "secret key");
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // for 1 day
  });

  res.send({
    message: "success",
  });
});

router.get("/user", async (req, res) => {
  try {
    // checking the cookie JWT token whether it is present inside the user browser or not
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "secret");

    // if the token is not correct
    if (!claims) {
      console.log("claims");

      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    // simply finding the details of the user and sending the detais about the user
    const user = await User.findOne({ _id: claims._id });
    const { password, ...data } = await user.toJSON();
    res.send(data);
  } catch (err) {
    console.log("err");

    return res.status(401).send({
      message: "unauthenticated",
    });
  }
});

// for delete the cookie with logout button
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "success",
  });
});
module.exports = router;
