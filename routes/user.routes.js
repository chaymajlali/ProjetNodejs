const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');


router.post('/add', userController.addUser);


router.get('/getAllUsers', userController.getAllUsers);


router.get('/getById/:id', userController.getUserById);


router.delete('/delete/:id', userController.delete);


router.put('/update/:id', userController.put);

module.exports = router;