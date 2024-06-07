const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filter file yang diizinkan
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Batasan ukuran file 5MB
  fileFilter: fileFilter
}).single('profilePic'); // Pastikan nama field 'profilePic' sesuai

module.exports = upload;
