const { response } = require("express");
const resturantModel = require("../models/resturantModel");

const createResturantControllers = async (req, res) => {
  try {
    // Get The data
    const {
      title,
      imageUrl,
      foods,
      ime,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // Validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide the correct Title and Address",
      });
    }
    // Create a new restaurant
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      ime,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    // Save the restaurant
    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "Restaurants saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating controllers",
    });
  }
};

//  Get all Resturant Data
const getAllResturantControllers = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(400).send({
        success: false,
        message: "No Resturant Found",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errror in Fetchiong API of Resturant Data",
    });
  }
};

//  Get Resturant by ID
const getResturantByIdControllers = async (req, res) => {
  try {
    const resturantid = req.params.id;
    const resturant = await resturantModel.findById(resturantid);
    // Validation
    if (!resturantid) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturant iD",
      });
    }

    //  validation for the new alter resturant Id
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "Resturant not found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting  API of Resturant Data by id ",
    });
  }
};
//  Delete Resturant || Delete
const deleteResturantControllers = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting API of Resturant Data",
    });
  }
};

module.exports = {
  createResturantControllers,
  getAllResturantControllers,
  getResturantByIdControllers,
  deleteResturantControllers,
};
