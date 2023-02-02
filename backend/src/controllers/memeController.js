const Meme = require("../models/meme.model");
const multer = require("multer");
const { validationResult } = require("express-validator");
require("dotenv").config();

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/memes");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const getMemes = async (req, res) => {
  try {
    const memes = await Meme.find();
    res.json(memes);
    return;
  } catch (e) {
    res.status(400).json({ message: "Error get memes" });
  }
};

const getMemeById = async (req, res) => {
  try {
    const { _id } = req.body;
    const meme = await Meme.findOne(_id);
    res.json(meme);
    return;
  } catch (e) {
    res.status(400).json({ message: "Error get product" });
  }
};

const postMeme = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Error to post", errors });
  }
  console.log(req.user);
  const creator = req.user.username;
  const image = req.file.filename;
  const meme = new Meme({
    creatorId: req.user.id,
    creator: creator,
    image: image,
  });
  await meme.save();
  return res.json({ message: "Meme posted !" });

  // exports.deleteMeme = async (req, res) => {
  //   // Find the meme to delete
  //   const meme = await Meme.findById(req.params.id);

  //   // Check if the user who made the request is the creator of the meme
  //   if (meme.creator.toString() !== req.user.id) {
  //     return res.status(401).json({
  //       error: "Not authorized to delete this meme",
  //     });
  //   }

  //   // Delete the meme
  //   await meme.remove();

  //   // Update the user's list of memes
  //   const user = await User.findById(req.user.id);
  //   user.memes = user.memes.filter((memeId) => memeId.toString() !== req.params.id);
  //   await user.save();

  //   return res.status(200).json({
  //     success: true,
  //     data: {},
  //   });
  // };
};

module.exports = { getMemes, getMemeById, postMeme, upload };
