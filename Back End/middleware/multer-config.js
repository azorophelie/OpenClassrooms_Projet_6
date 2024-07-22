const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();
  
  const { filename, path: filePath } = req.file;
  try {
    const outputFilePath = path.join('images', `${path.parse(filename).name}.webp`);
    await sharp(filePath).resize({ width: 260 }).webp({ quality: 100 }).toFile(outputFilePath);
    fs.unlink(filePath, err => {
      if (err) console.error('Error removing original file:', err);
    });
    req.file.filename = path.basename(outputFilePath);
    req.file.path = outputFilePath;
    next();
  } catch (error) {
    next(error);
  }
};

const upload = multer({ storage: storage });

module.exports = {
  upload,
  optimizeImage
};
