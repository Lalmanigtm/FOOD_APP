// For Register

const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// Register in authenticated
const registerControllers = async (req, res) => {
  try {
    const { username, email, password, address, phone, answer } = req.body;
    // Validation
    if (!username || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please enter",
      });
    }
    // Check

    const existing = await userModels.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        messsage: "This Email is already Register. Login Now.",
      });
    }
    //  Password Hashing
    var salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, salt);
    // Create a new  User
    const newuser = await userModels.create({
      username,
      email,
      password: passwordHash,
      address,
      phone,
      answer,
    });
    res.status(200).send({
      success: true,
      message: "Successfully register",
      // user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration failed",
      error,
    });
  }
};
// Login in authenticated user
const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if ((!email, !password)) {
      return res.status(500).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Check user Password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Password mismatch",
      });
    }

    // Token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};
module.exports = { registerControllers, loginControllers };
