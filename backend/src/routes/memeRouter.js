const express = require("express");
const multer = require("multer");

const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const memeController = require("../controllers/memeController");

router.get("/", memeController.getMemes);
router.get("/:id", memeController.getMemeById);
router.post(
  "/upload",
  authMiddleware(),
  memeController.upload.single("image"),
  memeController.postMeme
);

module.exports = router;
