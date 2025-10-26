module.exports = (app) => {
  const shoppingCartController = require("../controllers/shoppingcart.controller");

  // Add article to shopping cart
  app.post("/shoppingcart/:userId/add", shoppingCartController.addArticle);

  // Delete article from shopping cart
  app.delete("/shoppingcart/:userId/:refArticulo", shoppingCartController.deleteArticle);

  // GET user shopping cart
  app.get("/shoppingcart/:userId", shoppingCartController.getUserShoppingCart);
};

// 1️⃣ Add Article (POST)

// URL:

// POST http://localhost:3001/shoppingcart/nc8394034/add

// Body (JSON, raw):

// {
//   "article": {
//     "refArticulo": "ART123",
//     "cantidad": 2,
//     "precio": 15.5,
//     "imagen": "https://example.com/articulo.jpg"
//   }
// }

// Esto añadirá el artículo ART123 al carrito del usuario nc8394034.

// Si ya existe, solo sumará la cantidad y actualizará el precio.

// 2️⃣ Delete Article (DELETE)

// URL:

// DELETE http://localhost:3001/shoppingcart/nc8394034/ART123

// No necesitas body, el refArticulo se pasa por la URL.

// Esto eliminará el artículo ART123 del carrito del usuario nc8394034.

// 3️⃣ Get User Shopping Cart (GET)

// URL:

// GET http://localhost:3001/shoppingcart/nc8394034

// Esto devolverá todo el carrito del usuario nc8394034.

// Si no tiene carrito, devolverá { articles: [], totalPrice: 0 }.
