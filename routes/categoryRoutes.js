const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryControllers,
  getAllCategoryControllers,
  updateCategoryControllers,
} = require("../controllers/categoryControllers");

const router = express.Router();

// Create Category || POST
router.post("/create", createCategoryControllers);
// Get All Categories || GET
router.get("/getAll", getAllCategoryControllers);
//  Update Category || Put
router.put("/update/:id", updateCategoryControllers);

module.exports = router;
