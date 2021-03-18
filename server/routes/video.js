const express = require("express");
const router = express.Router();

const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  fileName: function (req, file, cb) {
    cb(null, `${Data.now()}_${file.originalname}`);
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    if (ext !== ".mp4") {
      return cb(
        res
        .status(400)
        .end("Only MP4 format files are allowed"),
        false,
      );
    }

    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadFile", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({
        success: false,
        err,
      });
    }

    return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.fileName,
      });
  });
});

module.exports = router;
