const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/all', authController.verifyToken, userController.getAllUsers); // Test Auth Server Side

router.get('/getUser/:id', authController.verifyToken, userController.FindUserByID);  

router.post('/updateUser/:id', authController.verifyToken, userController.UpdateUserByID);  

router.post('/addContact/:id', authController.verifyToken, userController.AddContact);  

router.post('/newChat', authController.verifyToken, userController.NewChat);  

router.post('/addChat', authController.verifyToken, userController.AddChat);  

router.get('/getChats', authController.verifyToken, userController.FindAllChats);

router.get('/getMessage/:chatid', authController.verifyToken, userController.FindMessageByID);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;