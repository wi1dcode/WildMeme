const Meme = require("../models/meme.model");
const User = require("../models/user.model");
const multer = require("multer");
const { validationResult } = require("express-validator");
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
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const getMemes = async (req, res) => {
  try {
    const memes = await Meme.find().populate("creatorId", "username");
    res.json(memes);
  } catch (e) {
    res.status(400).json({ message: "Error getting memes" });
  }
};

const getMemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const meme = await Meme.findById(id).populate("creatorId", "username");
    if (!meme) {
      return res.status(404).json({ message: "Meme not found" });
    }
    res.json(meme);
  } catch (e) {
    res.status(400).json({ message: "Error getting meme" });
  }
};

const postMeme = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  try {
    const { id, username } = req.user;
    const image = req.file.filename;

    const meme = new Meme({
      creatorId: id,
      creator: username,
      image: image,
    });

    await meme.save();

    await User.findByIdAndUpdate(id, { $push: { memes: meme._id } });

    res.json({ message: "Meme posted!", meme });
  } catch (e) {
    res.status(500).json({ message: "Error posting meme", error: e.message });
  }
};

const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const meme = await Meme.findById(id);

    if (!meme) {
      return res.status(404).json({ message: "Meme not found" });
    }

    if (meme.creatorId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ error: "Not authorized to delete this meme" });
    }

    await meme.remove();
    await User.findByIdAndUpdate(req.user.id, { $pull: { memes: id } });

    res.status(200).json({ message: "Meme deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error deleting meme", error: e.message });
  }
};

module.exports = { getMemes, getMemeById, postMeme, deleteMeme, upload };
