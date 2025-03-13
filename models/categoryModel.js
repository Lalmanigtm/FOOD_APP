const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resturant Title is required."],
    },
    imageUrl: {
      type: String,
      default:
        "https://graphicsfamily.com/wp-content/uploads/edd/2021/06/Editable-Photoshop-Food-Logo-Design-PNG-Transparent.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
