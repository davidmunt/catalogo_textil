const asyncHandler = require("express-async-handler");
const LastSeen = require("../models/lastseen.model");

const productSeen = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    return res.status(400).json({ message: "Se requiere userId y productId" });
  }
  const newSeen = await LastSeen.create({
    userId,
    productId,
  });
  res.status(201).json({
    lastSeen: await newSeen.toLastSeenResponse(),
  });
});

const getLastSeenProducts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "Se requiere userId" });
  }
  const lastSeenItems = await LastSeen.find({ userId }).sort({ createdAt: -1 }).limit(10).exec();
  const response = await Promise.all(lastSeenItems.map((item) => item.toLastSeenResponse()));
  res.status(200).json({ lastSeen: response });
});

module.exports = {
  productSeen,
  getLastSeenProducts,
};
