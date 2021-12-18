const express = require("express");
const swaggerUi = require("swagger-ui-express");
const routes = express();

routes.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(require("../swagger.json"))
);

const loginFilter = require("./filters/loginFilter");
const { login } = require("./controllers/authentication");
const {
  registerUsers,
  getUser,
  updateUserProfile,
  deleteUser,
} = require("./controllers/users");

routes.post("/users", registerUsers);

routes.post("/login", login);

routes.use(loginFilter);

routes.get("/profile", getUser);

routes.put("/profile", updateUserProfile);

routes.delete("/profile", deleteUser);

module.exports = routes;
