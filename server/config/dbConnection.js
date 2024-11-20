const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log('Database connection established!');
    } catch (error) {
        console.error('Could not connect to database:', error.message);
    }
}

module.exports = connectDB;
