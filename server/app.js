const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/dbConnection');
const userRoutes = require('./routers/userRoutes');
require('dotenv').config();

const app = express();

// const corsOptions ={
//     origin:'http://127.0.0.1:5500', 
//     credentials:true,
//  }
 
//  app.use(cors(corsOptions)) ;

app.use(cors()) ;

app.use(express.json());

dbConnection();

app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT + ".");
});