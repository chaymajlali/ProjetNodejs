const express = require('express');
const router = express.Router();
const User=require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const authController = require('../controllers/auth.controllers');

// 📌 Route pour l'inscription (Register)
router.post('/register', authController.register);

// 📌 Route pour la connexion (Login)
router.post('/login', authController.login);
// 📌 Route pour récupérer le profil utilisateur (protégée)
router.get('/me', authController.authMiddleware, authController.getProfile);
router.get("/profile", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password"); // Exclure le mot de passe
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
module.exports = router;
