const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  userForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: String,
  },
  movieTitle: {
    type: String,
  },
  movieImage: {
    type: String,
  },
  movieRunTime: {
    type: String,
  },
});

const Favourite = mongoose.model("Favourite", favouriteSchema);
module.exports = { Favourite };