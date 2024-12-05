const express = require('express');
const cors = require('cors');

const dbConnection = require('./config/dbConnection');
const userRoutes = require('./routers/userRoutes');
const chatRoutes = require('./routers/chatRoute');

const app = express();  

require('dotenv').config();

app.use(cors()) ;

app.use(express.json());

dbConnection();

const http = require("http");
const { Server } = require("socket.io");

const socketHandler = require('./socketHandler');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    },
});

socketHandler(io);

app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

server.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT + ".");
});