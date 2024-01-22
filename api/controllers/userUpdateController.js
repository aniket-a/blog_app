const userModel = require("../models/UserModel.js")
const bcrypt = require("bcryptjs");
const postModel = require("../models/PostModel.js")

const userUpdateController = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const getSalt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, getSalt);
    }
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } 
      );
      return res
        .status(200)
        .json({ message: "User updated successfully!", updatedUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error in updating data", error: error.message });
    }
  } else {
    return res
      .status(500)
      .json({ message: "You can update only your account!" });
  }
};

const userDeleteController = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await userModel.findById(req.params.id);
      try {
        await postModel.deleteMany({ userName: user.userName });
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "user deleted success" });
      } catch (error) {
        return res.status(500).json(error.message);
      }
    } catch (error) {
      return res.status(500).json("user Not Found!");
    }
  } else {
    return res.status(500).json("getting issue while deleting an user!");
  }
};

const getUserById = async (req, res)=>{
  try {
      const user = await userModel.findById(req.params.id);
      const {password, ...other} = user._doc
      res.status(200).json({other})
  } catch (error) {
    return res.status(500).json(error)
  }
}


module.exports = {
  userUpdateController,
  userDeleteController,
  getUserById,
};