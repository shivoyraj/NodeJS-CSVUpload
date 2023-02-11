const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  filename: { type: String },
  data: { type: Object }
});

module.exports = mongoose.model("CSV", csvSchema);