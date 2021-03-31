const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post("/getLikes", (req, res) => {
  let data = {};

  if (req.body.movieId) {
    data = { movieId: req.body.movieId };
  } else {
    data = { commentId: req.body.commentId };
  }

  Like.find(data).exec((err, likes) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).json({ success: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  let data = {};

  if (req.body.movieId) {
    data = { movieId: req.body.movieId };
  } else {
    data = { commentId: req.body.commentId };
  }

  Dislike.find(data).exec((err, dislikes) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", (req, res) => {
  let data = {};

  if (req.body.movieId) {
    data = { movieId: req.body.movieId, userId: req.body.userId };
  } else {
    data = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const like = new Like(data);

  like.save((err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // Validate, If the Dislike button is already clicked -> we need to decrease the Dislikes by 1
    Dislike.findOneAndDelete(data).exec((err) => {
      if (err) {
        return res.json({ success: false, err });
      }

      res.status(200).json({ success: true });
    });
  });
});

router.post("/unLike", (req, res) => {
  let data = {};

  if (req.body.movieId) {
    data = { movieId: req.body.movieId, userId: req.body.userId };
  } else {
    data = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Like.findOneAndDelete(data).exec((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({ success: true });
  });
});

router.post("/upDislike", (req, res) => {
  let data = {};

  if (req.body.movieId) {
    data = { movieId: req.body.movieId, userId: req.body.userId };
  } else {
    data = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const dislike = new Dislike(data);

  dislike.save((err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // Validate, If the Like button is already clicked -> we need to decrease the Likes by 1
    Like.findOneAndDelete(data).exec((err) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      res.status(200).json({ success: true });
    });
  });
});

router.post("/unDislike", (req, res) => {
  let data = {};

  if (req.body.movieId) {
    data = { movieId: req.body.movieId, userId: req.body.userId };
  } else {
    data = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Dislike.findOneAndDelete(data).exec((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({ success: true });
  });
});

module.exports = router;
