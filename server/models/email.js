const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

const Emails = mongoose.model("Email", emailSchema);

module.exports = Emails;
