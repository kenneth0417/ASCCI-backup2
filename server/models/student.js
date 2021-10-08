const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Students = mongoose.model("Student", studentSchema);

module.exports = Students;
