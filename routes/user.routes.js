const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

// 📌 Route pour ajouter un utilisateur
router.post('/add', userController.addUser);

// 📌 Route pour récupérer tous les utilisateurs
router.get('/getAllUsers', userController.getAllUsers);

// 📌 Route pour récupérer un utilisateur par son ID
router.get('/getById/:id', userController.getUserById);

// 📌 Route pour supprimer un utilisateur par son ID
router.delete('/delete/:id', userController.delete);

// 📌 Route pour modifier un utilisateur par son ID
router.put('/update/:id', userController.put);

module.exports = router;