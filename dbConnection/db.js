// Require Mongoose library
const db = require("mongoose");

// Connect to MongoDB Atlas database
db.connect(
  "mongodb+srv://Elad:Elad1234554321@cluster0.eguro0y.mongodb.net/webStore"
).then(console.log("db is active"));

// Export the Mongoose connection for use in other files
module.exports = db;
