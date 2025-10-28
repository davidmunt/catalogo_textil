module.exports = (app) => {
  const userController = require("../controllers/user.controller");

  app.post("/user/login", userController.userLogin);

  app.post("/user/register", userController.registerUser);

  app.get("/user/:username", userController.getCurrentUser);
};
