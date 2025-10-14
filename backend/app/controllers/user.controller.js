const asyncHandler = require("express-async-handler");
const argon2 = require("argon2");
const User = require("../models/user.model");

const registerUser = asyncHandler(async (req, res) => {
  const { user } = req.body;
  if (!user || !user.username || !user.password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  const userNameExists = await User.findOne({ username: user.username }).exec();
  if (userNameExists) {
    return res.status(409).json({ message: "El nombre de usuario ya existe" });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(user.username)) {
    return res.status(400).json({ message: "El nombre de usuario solo puede contener letras, números y guiones bajos" });
  }
  if (user.username.length < 3) {
    return res.status(400).json({ message: "El nombre debe tener al menos 6 caracteres" });
  }
  if (user.password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }
  const hashedPwd = await argon2.hash(user.password);
  const newUser = {
    username: user.username,
    password: hashedPwd,
  };
  const createdUser = await User.create(newUser);
  if (createdUser) {
    res.status(201).json({
      user: await createdUser.toUserResponse(),
    });
  } else {
    res.status(422).json({
      errors: { body: "Unable to register a user" },
    });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { user } = req.body;
  if (!user || !user.username || !user.password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  const loginUser = await User.findOne({ username: user.username }).exec();
  if (!loginUser) return res.status(404).json({ message: "Usuario no enconctrado" });
  const match = await argon2.verify(loginUser.password, user.password);
  if (!match) return res.status(401).json({ message: "Usuario o contraseña incorrecta" });
  res.status(200).json({
    user: await loginUser.toUserResponse(),
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.status(200).json({
    user: await user.toUserResponse(),
  });
});

module.exports = {
  registerUser,
  userLogin,
  getCurrentUser,
};
