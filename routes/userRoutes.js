const express = require("express");
const {
  getUserControllers,
  updateUserControllers,
  updatePasswordControllers,
  resetPasswordControllers,
  deleteProfileControllers,
} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
// Users Routes with get.
router.get("/getUser", authMiddleware, getUserControllers);
// update Ptrofile

// router.put("/updateUser", authMiddleware, updateUserControllers);
router.put("/updateUser", authMiddleware, updateUserControllers);
//  Updatr the user.

router.post("/updatePassword", authMiddleware, updatePasswordControllers);

// Reset the password
router.post("/resetPassword", authMiddleware, resetPasswordControllers);

// Dleate profile
router.delete("/deleteUser/:id", authMiddleware, deleteProfileControllers);

module.exports = router;
