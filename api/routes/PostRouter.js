const express = require("express")
const router = express.Router();
const postController = require("../controllers/postController.js")

// create post
router.post("/", postController.createPostController)

// update Post
router.put("/:id", postController.updatePostController);

// delete post
router.delete("/:id", postController.deletePostController);

// get post depend on specific id
router.get("/:id", postController.getPostById);

router.get("/", postController.getAllPost);

module.exports = router