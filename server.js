const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dot en configuration
dotenv.config();

//DB connection
connectDb();

//rest object
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// child Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

// Main routes
app.get("/", (req, res) => {
  res.send("<h1>Happy, Coding in The new World of Saurab!</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.white.bgMagenta);
});
