const mongoose = require('mongoose');
require('dotenv').config()

const config = require('config');
const MONGO_URI = process.env.MONGO_URI

// const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB;
