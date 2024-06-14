const mongoose = require("mongoose");
const {
  dbUser,
  dbPass,
  dbHost,
  dbName,
  dbAppName,
} = require("../configServer");

const connectionString = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=${dbAppName}`;

mongoose
  .connect(connectionString, {
    serverSelectionTimeoutMS: 45000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const dbMongoose = mongoose.connection;

dbMongoose.on("error", console.error.bind(console, "connection error:"));

module.exports = dbMongoose;
