const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer({ dest: "uploads/profiles" });
const fs = require("fs");
const { validationResult } = require("express-validator");
require("dotenv").config();

const generateAccessToken = (id, role, username) => {
  const payload = {
    id,
    role,
    username,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Error in signup", errors });
    }
    const { username, password } = req.body;
    const candidate = await User.findOne({ username });
    if (candidate) {
      return res.status(400).json({ message: "Already registered" });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({
      username,
      password: hashPassword,
      role: "user",
    });
    await user.save();
    return res.json({ message: "Registered" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Registration error" });
  }
};

const validateToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: "Token is missing" });
    }

    const userData = authService.validateAccessToken(token.split("Bearer ")[1]);

    return res.status(200).json({ userData });
  } catch (e) {
    res.status(403).json({ message: "Token invalid" });
  }
};

// const signup = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: "Error in signup", errors });
//     }
//     const { username, password } = req.body;
//     const candidate = await User.findOne({ username });
//     if (candidate) {
//       return res.status(400).json({ message: "Already registered" });
//     }
//     const hashPassword = bcrypt.hashSync(password, 7);
//     const avatarFile = req.file;
//     const uuidFileName = uuidv4() + "-" + avatarFile.originalname;
//     fs.rename(
//       `uploads/profiles/${avatarFile.filename}`,
//       `uploads/profiles/${uuidFileName}`,
//       (err) => {
//         if (err) throw err;
//       }
//     );
//     const user = new User({
//       username,
//       password: hashPassword,
//       avatar: uuidFileName,
//       role: "user",
//     });
//     await user.save();
//     return res.json({ message: "Registered" });
//   } catch (e) {
//     console.log(e);
//     res.status(400).json({ message: "Registration error" });
//   }
// };

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: `User ${username} not found!` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `Wrong password!` });
    }
    const token = generateAccessToken(user._id, user.role, user.username);
    return res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Login error" });
  }
};

module.exports = {
  signup,
  login,
  validateToken,
};
