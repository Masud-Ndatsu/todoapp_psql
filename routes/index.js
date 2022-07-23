const todoRouteHandler = require("./todo.routes");
const userRouteHandler = require("./user.routes");
module.exports = (app) => {
  app.use("/api/v1/todos", todoRouteHandler);
  app.use("/api/v1/users", userRouteHandler);
};
