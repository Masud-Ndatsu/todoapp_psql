const { sequelize } = require("../models/");

const connectDB = async () => {
  try {
    await sequelize.authenticate({ force: true });
    console.log("Database Connected!");
  } catch (err) {
    console.log({ error: err.message });
  }
};

module.exports = { connectDB };
