const multer = require("multer");
const path = require("path");
const { UPLOADS_DIR } = require("../../config/paths");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});


const upload = multer({ storage });

module.exports = { upload  };
