const mongoose = require("mongoose");

const concernSchema = new mongoose.Schema({
  ticket: {
    type: String,
  },
  student: {
    type: String,
  },
  subject: {
    type: String,
  },
  category: {
    type: String,
  },
  department: {
    type: String,
  },
  yearLevel: {
    type: String,
  },
  body: {
    type: String,
  },
  attachments: {
    type: [String],
    default: [],
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  dateEvaluated: {
    type: Date,
  },
  forum: {
    type: [Object],
    default: [],
  },
  receiver: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    default: "Pending",
  },
  acadYear: {
    type: String,
  },
});

const Concerns = mongoose.model("Concern", concernSchema);

module.exports = Concerns;
