const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantControllers,
  getAllResturantControllers,
  getResturantByIdControllers,
  deleteResturantControllers,
} = require("../controllers/resturantControllers");

const router = express.Router();

//  Create Resturant || POST
router.post("/create", createResturantControllers);

// Get the all Data
router.get("/getAll", getAllResturantControllers);

// Get Data by id
router.get("/get/:id", getResturantByIdControllers);

// Delete Resturant || Delete
router.delete("/delete/:id", deleteResturantControllers);

module.exports = router;
