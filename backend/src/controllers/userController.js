const User = require("../models/user.model");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(400).json({ message: "Error get users" });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: "Token is missing" });
    }

    const userData = authService.validateAccessToken(token.split("Bearer ")[1]);
    if (!userData) {
      return res.status(403).json({ message: "Token invalid" });
    }

    let user = await User.findById(userData.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUsers, getMe };
