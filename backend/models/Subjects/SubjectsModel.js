const mongoose = require("mongoose");

const SubjectsSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    max: 10,
  },
  subjectName: {
    type: String,
    max: 50,
  },
});

module.exports = mongoose.model("Subject", SubjectsSchema);
