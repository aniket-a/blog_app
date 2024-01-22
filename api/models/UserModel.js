const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    default: ""
  },
  profilePic:{
    type:String,
    default:""
  },
},{timestamps:true});

const userModel = mongoose.model("user", userSchema)
module.exports = userModel