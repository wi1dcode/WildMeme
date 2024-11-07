const { Schema, model } = require("mongoose");

const Meme = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Meme", Meme);
