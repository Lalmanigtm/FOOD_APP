const express = require("express");
const {
  registerControllers,
  loginControllers,
} = require("../controllers/authControllers");

const router = express.Router();
// Register post routes
router.post("/register", registerControllers);
// Login post routes
router.post("/login", loginControllers);
module.exports = router;
