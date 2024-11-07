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
    memes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Meme",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Meme",
      },
    ],
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", User);
