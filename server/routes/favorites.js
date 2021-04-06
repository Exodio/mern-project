const express = require("express");
const router = express.Router();

const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

router.post("/favoriteNumber", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json({ success: true, favoriteNumber: data.length });
  });
});

router.post("/favorited", (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, data) => {    
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    let addedToFavorite = false;

    if (data.length !== 0) {
        addedToFavorite = true;
    }

    res.status(200).json({ success: true, favorited: addedToFavorite });
  });
});

router.post("/addToFavorite", auth, (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, movieData) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true, movieData });
  });
});

router.post("/removeFromFavorite", auth, (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({ success: true, data });
  });
});

router.post("/getFavorites", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) {
      return res.status(400).send(err);
    }

    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;