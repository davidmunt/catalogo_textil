module.exports = (app) => {
  const lastSeenController = require("../controllers/lastseen.controller");

  app.post("/lastseen/productseen", lastSeenController.productSeen);

  app.get("/lastseen/:userId", lastSeenController.getLastSeenProducts);
};
