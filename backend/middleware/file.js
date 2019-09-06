const multer = require('multer');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {    // cb is a callback
    const isValid = MIME_TYPE_MAP[file.mimetype];   // seeing if the MIMEtype supported is held by the file
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");   //relative to server.js
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");  // extract the name, multer deals with the extension type
    const ext = MIME_TYPE_MAP[file.mimetype];  // extracting extenstionss
    cb(null, name + "-" + Date.now() + "." + ext);  // should make a unique file name
  }
});


module.exports = multer({storage: storage}).single("image");
