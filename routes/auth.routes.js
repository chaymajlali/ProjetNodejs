const express = require('express');
const router = express.Router();
const User=require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const authController = require('../controllers/auth.controllers');


router.post('/register', authController.register);


router.post('/login', authController.login);

router.get('/me', authController.authMiddleware, authController.getProfile);
router.get("/profile", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
module.exports = router;
