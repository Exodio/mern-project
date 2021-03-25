const express = require("express");
const router = express.Router();

const { Favourite } = require("../models/Favourite");

const { auth } = require("../middleware/auth");

router.post("/favouriteNumber", auth, (req, res) => {
    Favourite.find({ movieId: req.body.movieId })
    .exec((err, favourite) => {
      if (err) {
        return res.status(400).send(err);
      }

      res
        .status(200)
        .json({ success: true, favouriteNumber: favourite.length });
    });
});

router.post("/favourited", auth, (req, res) => {
  Favourite.find({
    movieId: req.body.movieId,
    userForm: req.body.userForm,
  })
  .exec((err, favourites) => {
    if (err) {
      return res.status(400).send(err);
    }

    let movieFavourited = false;

    if (favourites.length !== 0) {
      movieFavourited = true;
    }

    res
    .status(200)
    .json({ success: true, favourited: movieFavourited });

  });
});

router.post("/addToFavourite", auth, (req, res) => {
  const favourite = new Favourite(req.body);

  favourite.save((err, data) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

router.post("/removeFromFavourite", auth, (req, res) => {
  Favourite.findOneAndDelete({
    movieId: req.body.movieId,
    userForm: req.body.userForm,
  })
  .exec((err, data) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({ success: true, data });
  });
});

module.exports = router;