const express = require("express")
const router = express.Router();
const categories = require("../controllers/categoryController");

// create
router.post("/", categories.createCategory);

// get All cat
router.get("/", categories.getAllCategories);



module.exports = router;