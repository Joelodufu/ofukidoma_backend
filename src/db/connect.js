const mongoose = require('mongoose');

const dotenv = require("dotenv")

dotenv.config({ path: "./src/config.env" })

const DATABASE_URI = process.env.LOCAL_DB
const RECONNECT_INTERVAL = 5000; // Refresh connection every 5 seconds (adjust as needed)

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
    });
    console.log('⚡️:: Connected to MongoDB!');
  } catch (err) {
    console.error(`Can't connect to MongoDB ${err}`);
    // Retry connection at intervals
    setTimeout(connectDB, RECONNECT_INTERVAL);
  }
};

module.exports = connectDB;

