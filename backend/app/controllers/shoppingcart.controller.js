const asyncHandler = require("express-async-handler");
const ShoppingCart = require("../models/shoppingcart.model");

const addArticle = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { article } = req.body;

  if (!article || !article.refArticulo || !article.cantidad || !article.precio || !article.imagen) {
    return res.status(400).json({ message: "Todos los campos del artículo son requeridos" });
  }

  let cart = await ShoppingCart.findOne({ userId, purchased: false }).exec();

  if (!cart) {
    cart = await ShoppingCart.create({
      userId,
      articles: [article],
      totalPrice: article.cantidad * article.precio,
      purchased: false,
    });
  } else {
    const existingArticleIndex = cart.articles.findIndex((a) => a.refArticulo === article.refArticulo);

    if (existingArticleIndex > -1) {
      cart.articles[existingArticleIndex].cantidad += article.cantidad;
      cart.articles[existingArticleIndex].precio = article.precio;
    } else {
      cart.articles.push(article);
    }

    cart.totalPrice = cart.articles.reduce((acc, a) => acc + a.cantidad * a.precio, 0);
    await cart.save();
  }

  res.status(200).json({ shoppingCart: await cart.toShoppingCartResponse() });
});

const deleteArticle = asyncHandler(async (req, res) => {
  const { userId, refArticulo } = req.params;

  if (!refArticulo) {
    return res.status(400).json({ message: "Se requiere refArticulo para eliminar" });
  }

  const cart = await ShoppingCart.findOne({ userId, purchased: false }).exec();

  if (!cart) {
    return res.status(404).json({ message: "Carrito activo no encontrado para este usuario" });
  }

  const initialLength = cart.articles.length;
  cart.articles = cart.articles.filter((a) => a.refArticulo !== refArticulo);

  if (cart.articles.length === initialLength) {
    return res.status(404).json({ message: "Artículo no encontrado en el carrito" });
  }

  cart.totalPrice = cart.articles.reduce((acc, a) => acc + a.cantidad * a.precio, 0);
  await cart.save();

  res.status(200).json({ shoppingCart: await cart.toShoppingCartResponse() });
});

const getUserShoppingCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  let cart = await ShoppingCart.findOne({ userId, purchased: false }).exec();

  if (!cart) {
    return res.status(200).json({
      shoppingCart: {
        userId,
        articles: [],
        totalPrice: 0,
        purchased: false,
        purchaseDate: null,
      },
    });
  }

  res.status(200).json({ shoppingCart: await cart.toShoppingCartResponse() });
});

const checkout = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const cart = await ShoppingCart.findOne({ userId, purchased: false }).exec();

  if (!cart || cart.articles.length === 0) {
    return res.status(400).json({ message: "No hay artículos en el carrito para finalizar la compra" });
  }

  cart.purchased = true;
  cart.purchaseDate = new Date();
  await cart.save();

  const newCart = await ShoppingCart.create({
    userId,
    articles: [],
    totalPrice: 0,
    purchased: false,
  });

  res.status(200).json({
    message: "Compra finalizada correctamente",
    purchasedCart: await cart.toShoppingCartResponse(),
    newCart: await newCart.toShoppingCartResponse(),
  });
});

const getPurchasesUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const purchases = await ShoppingCart.find({ userId, purchased: true }).sort({ purchaseDate: -1 }).exec();

  const response = await Promise.all(purchases.map((cart) => cart.toShoppingCartResponse()));

  res.status(200).json({ purchases: response });
});

module.exports = {
  addArticle,
  deleteArticle,
  getUserShoppingCart,
  checkout,
  getPurchasesUser,
};
