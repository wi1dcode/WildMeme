const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "uploads/" });
const fs = require("fs");

router.get("/");
router.post("/api/avatar", upload.single("avatar"), (req, res) => {
  console.log(req.file);
  const { originalname, filename } = req.file;
  fs.rename(
    `uploads/${filename}`,
    `uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

module.exports = router;
