const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const multer = require("multer");

var ffmpeg = require("fluent-ffmpeg");

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

router.post("/createThumbnail", auth, (req, res) => {
  let fileDuration = "";
  let thumbsFilePath = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    if (err) {
      alert("fluent-ffmpeg failed to create video thumbnail");
    }

    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // Add input basename (filename without extension)
      filename: "thumbnail-%b.png",
    });
});

module.exports = router;
