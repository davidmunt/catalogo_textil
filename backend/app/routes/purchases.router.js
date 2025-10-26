module.exports = (app) => {
  const shoppingCartController = require("../controllers/shoppingcart.controller");

  app.post("/purchases/checkout/:userId", shoppingCartController.checkout);

  app.get("/purchases/:userId", shoppingCartController.getPurchasesUser);
};
