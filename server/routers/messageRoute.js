const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/sendMsg', messageController.createChat);

module.exports = router;