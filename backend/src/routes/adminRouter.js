const express = require("express");
const userController = require("../controllers/userController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.use(adminMiddleware());
router.get("/users", userController.getUsers);

module.exports = router;
