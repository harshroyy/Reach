// Database connection logic
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // This looks for the MONGO_URI in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // If we can't connect, stop the server immediately
    process.exit(1);
  }
};

module.exports = connectDB;