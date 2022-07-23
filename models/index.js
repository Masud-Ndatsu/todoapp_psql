const mongoose = require("mongoose");

// TODO create env for database connection uri
function connectDB() {
  mongoose.connect("mongodb://localhost:27017/coderina-todo-app", (error) => {
    if (error) {
      console.log("Database connection failed ", error.message);
    } else {
      console.log("Database connection successful");
    }
  });
}

module.exports = { connectDB };
