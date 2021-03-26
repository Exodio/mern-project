const express = require("express");
const router = express.Router();

const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
    _id: req.user._id,
    isAuth: true,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, data) => {
    if (err) {
      return res.json({
        success: false,
        err,
      });
    }

    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Authentication has failed, email address not found",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "Incorrect password, please try again",
        });
      }

      user.generateToken((err, user) => {
        if (err) {
            return res
            .status(400)
            .send(err);
        }
        
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    (err, data) => {
      if (err) {
        return res.json({
          success: false,
          err,
        });
      }

      return res
      .status(200)
      .send({
        success: true,
      });
    },
  );
});

module.exports = router;