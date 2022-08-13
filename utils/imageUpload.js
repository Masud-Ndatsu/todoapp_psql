const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now().toString() + "-" + file.originalname}`);
  },
});
function fileFilter(req, file, cb) {
  if (file.originalname.match(/\.(jpeg|jpg|png)$/gi)) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
