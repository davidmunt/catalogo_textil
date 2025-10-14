const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://static.productionready.io/images/smiley-cyrus.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

userSchema.methods.toUserResponse = async function () {
  return {
    user_id: this._id,
    username: this.username,
    image: this.image,
  };
};

module.exports = mongoose.model("User", userSchema);
