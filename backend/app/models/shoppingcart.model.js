const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const articleSchema = new mongoose.Schema({
  refArticulo: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  imagen: {
    type: String,
    required: true,
  },
});

const shoppingCartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    articles: [articleSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    purchased: {
      type: Boolean,
      required: true,
      default: false,
    },
    purchaseDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

shoppingCartSchema.plugin(uniqueValidator);

shoppingCartSchema.methods.toShoppingCartResponse = async function () {
  return {
    shoppingCartId: this._id,
    userId: this.userId,
    articles: this.articles.map((a) => ({
      refArticulo: a.refArticulo,
      cantidad: a.cantidad,
      precio: a.precio,
      imagen: a.imagen,
    })),
    totalPrice: this.totalPrice,
    purchased: this.purchased,
    purchaseDate: this.purchaseDate,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
