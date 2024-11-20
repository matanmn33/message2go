const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.get('/all', authController.verifyToken, userController.getAllUsers);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;