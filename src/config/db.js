const mongoose = require("mongoose");

const mongoDbUrl = process.env.MONGO_URI;
const connectDb = () => {
  console.log("Database is connecting...");
  return mongoose.connect(mongoDbUrl);
};

module.exports = { connectDb };
