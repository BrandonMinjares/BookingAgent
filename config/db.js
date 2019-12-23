const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    const conn = await mongoose.connect(db, { 
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;