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

module.exports = { getUsers };
