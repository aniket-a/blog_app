const categoryModel = require("../models/CategoryModel");

//  create Categories
const createCategory = async (req, res) => {
  const cat = new categoryModel(req.body);
  try {
    const newCat = await cat.save();
    res.status(200).json(newCat);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// get All categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
