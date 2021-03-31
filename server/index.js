const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is successfully connected..........!"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/favorites", require("./routes/favorites"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/likes", require("./routes/likes"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is running on port: ${port}..........!`);
});