const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/all', userController.getAllUsers);  

router.get('/getUser/:id', userController.FindUserByID);  

router.post('/updateUser/:id', userController.UpdateUserByID);  

router.post('/addContact/:id', userController.AddContact);  

router.post('/newChat', userController.NewChat);  

router.post('/addChat', userController.AddChat);  

router.get('/getChats', userController.FindAllChats);

router.get('/getMessage/:chatid', userController.FindMessageByID);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;