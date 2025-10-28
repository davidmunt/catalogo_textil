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

  const lastSeenItems = await LastSeen.find({ userId }).sort({ createdAt: -1 }).exec();

  const seenProductsMap = new Map();
  for (const item of lastSeenItems) {
    if (!seenProductsMap.has(item.productId.toString())) {
      seenProductsMap.set(item.productId.toString(), item);
    }
  }

  const uniqueLastSeenItems = Array.from(seenProductsMap.values()).slice(0, 6);

  const response = await Promise.all(uniqueLastSeenItems.map((item) => item.toLastSeenResponse()));

  res.status(200).json({ lastSeen: response });
});

module.exports = {
  productSeen,
  getLastSeenProducts,
};
