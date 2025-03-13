const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user Name is required"],
    },
    email: {
      type: String,
      required: [true, " email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, " password is required"],
      minlength: 8,
    },
    address: {
      type: Array,
      required: true,
    },
    phone: {
      type: String,
      required: [true, " phone is required"],
    },
    usertype: {
      type: String,
      required: [true, " userType is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid",
    },
    answer: {
      type: String,
      required: [true, "Answer is required."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
