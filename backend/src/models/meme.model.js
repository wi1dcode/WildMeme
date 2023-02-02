const { Schema, model } = require("mongoose");

const Meme = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    creator: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Meme", Meme);
