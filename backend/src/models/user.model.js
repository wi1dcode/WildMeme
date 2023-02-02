const { Schema, model } = require("mongoose");

const User = new Schema(
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
    avatar: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("User", User);
