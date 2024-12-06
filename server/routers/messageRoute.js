const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

router.post('/sendMsg', messageController.createChat);

module.exports = router;