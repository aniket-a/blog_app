const express = require("express");
const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

//User Register
 const userRegisterController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log("Received data:", req.body);

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User is Already Exist!");
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const saveUser = new userModel({
      userName,
      email,
      password: hashedPassword,
    });

    await saveUser.save();

    res.status(201).json({
      message: "User Created Success!",
      saveUser: saveUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

// User Login
const userLoginController = async (req, res)=>{
  try {
      const user = await userModel.findOne({email:req.body.email});
      if(!user){
        return res.status(400).json("Wrong Credentials!")
      }else{
        const validated = await bcrypt.compare(req.body.password, user.password)
        if(!validated){
          return res.status(400).json("Wrong Credentials!");
        }else{
          return res.status(200).json({
            message:"Login successful!",
            user:user
          });
        }
      }
  } catch (error) {
    res.status(500).json(error.message)
  }
}



module.exports = {
  userRegisterController,
  userLoginController,
};


