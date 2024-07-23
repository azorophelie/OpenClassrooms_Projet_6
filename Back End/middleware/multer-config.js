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

const upload = multer({ storage: storage });

const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();
  
  const { filename, path: filePath } = req.file;

  try {
    const outputFilePath = path.join('images', `${path.parse(filename).name}.webp`);
    await sharp(filePath)
      .resize({ width: 260 })
      .webp({ quality: 100 })
      .toFile(outputFilePath);

    // Supprimer le fichier original après conversion
    fs.unlink(filePath, err => {
      if (err) console.error('Error removing original file:', err);
    });

    // Mettre à jour le chemin et le nom du fichier dans la requête
    req.file.filename = path.basename(outputFilePath);
    req.file.path = outputFilePath;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  optimizeImage
};
