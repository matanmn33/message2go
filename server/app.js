const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/dbConnection');
const userRoutes = require('./routers/userRoutes');
const messageRoutes = require('./routers/messageRoute');
require('dotenv').config();

const app = express();  

app.use(cors()) ;

app.use(express.json());

dbConnection();

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT + ".");
});