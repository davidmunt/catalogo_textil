module.exports = (app) => {
  const userController = require("../controllers/user.controller");

  // Login User
  app.post("/user/login", userController.userLogin);

  // Register new User
  app.post("/user/register", userController.registerUser);

  // GET User info
  app.get("/user/:username", userController.getCurrentUser);
};
