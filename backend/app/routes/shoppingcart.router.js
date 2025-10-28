module.exports = (app) => {
  const shoppingCartController = require("../controllers/shoppingcart.controller");

  app.post("/shoppingcart/:userId/add", shoppingCartController.addArticle);

  app.delete("/shoppingcart/:userId/:refArticulo", shoppingCartController.deleteArticle);

  app.get("/shoppingcart/:userId", shoppingCartController.getUserShoppingCart);
};
