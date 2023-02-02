const express = require("express");
const multer = require("multer");
const { check } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

const upload = multer({ dest: "uploads/profiles" });
const fs = require("fs");

router.get("/");
router.post(
  "/register",
  [
    check("username", "Username can not be empty").notEmpty(),
    check("password", "Password must be between 4 and 10 symboles")
      .isLength({
        min: 4,
        max: 15,
      })
      .notEmpty(),
  ],
  authController.signup
);
router.post("/login", authController.login);



module.exports = router;
