const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user'); // Modèle Parent
const Doctor = require('../models/docter'); // Modèle Spécifique
const Patient = require('../models/patient'); // Modèle Spécifique

// Clé secrète pour signer le token (met-la dans un fichier .env)
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// 📌 **Inscription**
exports.register = async (req, res) => {
    try {
        const { nom, email, password, role, specialite, tarif, telephone, adresse, image } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser;

        if (role === 'doctor') {
            newUser = new Doctor({ nom, email, password: hashedPassword, role, specialite, tarif, image });
        } else if (role === 'patient') {
            newUser = new Patient({ nom, email, password: hashedPassword, role, telephone, adresse, image });
        } else {
            newUser = new User({ nom, email, password: hashedPassword, role, image });
        }

        await newUser.save();
        res.status(201).json({ message: "Utilisateur inscrit avec succès.", user: newUser });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
};


// 📌 **Connexion**
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect." });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect." });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, user });

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
};

// 📌 **Middleware pour protéger les routes (authentification requise)**
exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Accès non autorisé." });
    }

    // Vérifier que le token commence bien par "Bearer "
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Format du token invalide." });
    }

    try {
        const token = tokenParts[1]; // Extraire uniquement le token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide.", error });
    }
};

// 📌 **Récupérer le profil utilisateur**
exports.getProfile = async (req, res) => {
    try {
        // Récupérer l'utilisateur en fonction de son rôle
        let user;
        if (req.user.role === 'doctor') {
            user = await Doctor.findById(req.user.userId).select('-password'); // Exclure le mot de passe
        } else if (req.user.role === 'patient') {
            user = await Patient.findById(req.user.userId).select('-password');
        } else {
            user = await User.findById(req.user.userId).select('-password');
        }

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du profil", error });
    }
};

