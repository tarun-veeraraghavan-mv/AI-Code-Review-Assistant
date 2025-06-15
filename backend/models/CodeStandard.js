const mongoose = require("mongoose");

const codeStandardSchema = new mongoose.Schema({
  codeStandardContent: {
    type: String,
  },
  fileName: {
    type: String,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CodeStandard = mongoose.model("CodeStandard", codeStandardSchema);

module.exports = CodeStandard;
