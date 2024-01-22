const express = require("express");
const router = express.Router();

const userController = require("../controllers/userRgisterController.js")

// REGISTER
router.post("/register", userController.userRegisterController);
router.post("/login", userController.userLoginController);

module.exports = router;