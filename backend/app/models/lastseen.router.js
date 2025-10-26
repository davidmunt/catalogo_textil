const mongoose = require("mongoose");

const lastSeenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

lastSeenSchema.methods.toLastSeenResponse = async function () {
  return {
    id: this._id,
    userId: this.userId,
    productId: this.productId,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model("LastSeen", lastSeenSchema);
