const express = require("express");
const router = express.Router();

const userController = require("../controllers/userUpdateController.js")

// Update User
router.put("/:id", userController.userUpdateController);

// Delete
router.delete("/:id", userController.userDeleteController);

// Get User
router.get("/:id", userController.getUserById)


module.exports = router