const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/joinChat', chatController.joinChat);

module.exports = router;