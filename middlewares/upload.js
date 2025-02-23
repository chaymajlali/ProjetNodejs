const multer = require('multer');
const path = require('path');

// Définir le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Sauvegarde les images dans le dossier 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque fichier
    }
});

// Filtrer les fichiers pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Le fichier doit être une image'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
