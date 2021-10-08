const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  identifier: {
    type: String,
  },
  definition: {
    type: String,
  },
});

const Categories = mongoose.model("Category", categoriesSchema);

module.exports = Categories;
