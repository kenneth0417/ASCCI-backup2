const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  acadYear: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Semesters = mongoose.model("Semester", semesterSchema);

module.exports = Semesters;
