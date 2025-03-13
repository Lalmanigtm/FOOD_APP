const testUserControllers = (req, res) => {
  try {
    res.status(200).send("<h1> Testing the user data</h1>");
  } catch (error) {
    console.log("Error in the test API ", error);
  }
};
module.exports = { testUserControllers };
