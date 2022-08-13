const todoRouteHandler = require("./todo.routes");
const userRouteHandler = require("./user.routes");
const { verifyUserToken } = require("../middlewares/auth");
const upload = require("../utils/imageUpload");

const userUpload = upload.single("profileImage");

module.exports = (app) => {
  app.use("/api/v1/todos", todoRouteHandler);
  app.use("/api/v1/users", userUpload, userRouteHandler);
};
