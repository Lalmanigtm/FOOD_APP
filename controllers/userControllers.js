const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");

// get user
const getUserControllers = async (req, res) => {
  try {
    // Find Users
    const user = await userModels.findById({ _id: req.body.id });
    // Validation of user
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Hide the Password
    user.password = undefined;
    // Response
    res.status(200).send({
      success: true,
      message: " User find succesfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetch Data",
    });
  }
};

// update User
const updateUserControllers = async (req, res) => {
  try {
    // find Users
    const user = await userModels.findById({ _id: req.body.id });
    //  Validations
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Update User
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    // Save User
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update the API Data",
    });
  }
};

// Update the API password
const updatePasswordControllers = async (req, res) => {
  try {
    // find Users
    const user = await userModels.findById({ _id: req.body.id });
    //  Validations
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // get data from User
    const { oldPassword, newPassword } = req.body;

    if ((!oldPassword, !newPassword)) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Old or New Password",
      });
    }
    //check user password  | compare password

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Old Password Mismatch",
      });
    }
    // update user password | hash password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    // save User
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully.",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Fetching API.",
    });
  }
};

// Reset the Password
const resetPasswordControllers = async (req, res) => {
  try {
    // find Users

    const { email, newPassword, answer } = res.body;
    //  Validations
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const user = await userModels.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    //  Password Hashing
    var salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully.",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset the Password API ",
    });
  }
};
// Delete User
const deleteProfileControllers = async (req, res) => {
  try {
    await userModels.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete the Profile",
      error,
    });
  }
};
module.exports = {
  getUserControllers,
  updateUserControllers,
  updatePasswordControllers,
  resetPasswordControllers,
  deleteProfileControllers,
};
