const { json } = require("stream/consumers");
const postModel = require("../models/PostModel");

// create post
const createPostController = async (req, res) => {
  try {
    const newPost = new postModel(req.body);
    const existingPost = await postModel.findOne({ title: newPost.title });

    if (existingPost) {
      return res.status(400).json({ message: "Post with the same title already exists." });
    }

    const savedPost = await newPost.save();
    
    res.status(200).json(savedPost);

  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update post
const updatePostController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (req.body.userName === post.userName) {
      try {
        const updatedPost = await postModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({ message: "user Post Updated", updatedPost });
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res
        .status(500)
        .json({ message: "you can update only your post!" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// deleting post
const deletePostController = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found");
    }

    if (post.userName === req.body.userName) {
      try {
        res.status(200).json("Post has been deleted successfully!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("Unauthorized");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// get post by id
const getPostById = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post)
  } catch (error) {
    return res.status(200).json(error);
  }
};

// get all posts
const getAllPost = async (req, res) => {
  const userName = req.query.userName;
  const cat = req.query.categories;
  try {
    let post;
    if (userName) {
      post = await postModel.find({ userName });
    } else if (cat) {
      post = await postModel.find({
        categories: {
          $in: [cat],
        },
      });
    } else {
      post = await postModel.find();
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createPostController,
  updatePostController,
  deletePostController,
  getPostById,
  getAllPost,
};
