const categoryModel = require("../models/categoryModel");

// create category
const createCategoryControllers = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // Validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Title is required",
      });
    }
    // Create a new category
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Category created successfully.",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category API",
    });
  }
};
const getAllCategoryControllers = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found.",
      });
    }
    res.status(200).send({
      success: true,
      totalCategory: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching categories API",
    });
  }
};
const updateCategoryControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating category API",
    });
  }
};
module.exports = {
  createCategoryControllers,
  getAllCategoryControllers,
  updateCategoryControllers,
};
